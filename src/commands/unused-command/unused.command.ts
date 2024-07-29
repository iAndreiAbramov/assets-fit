import { Command } from 'commander';
import type { ILogger } from '../../types/logger.interface';
import { getDirectoriesFromConfig } from '../../utils/get-directories-from-config.util.js';
import { getFilesList } from '../../utils/get-files-list.util.js';
import { getImportedPathsFromFileList } from './utils/get-imported-paths-from-file-list.util.js';
import { getUnusedAssetsList } from './utils/get-unused-paths-list.util.js';
import { isInChecklist } from './utils/is-in-checklist.util.js';
import { validateFilesDirectories } from '../../utils/validate-files-directories.util.js';
import { validateAssetsDirectories } from '../../utils/validate-assets-directories.util.js';

export const registerUnusedCommand = ({
	program,
	logger,
}: {
	program: Command;
	logger: ILogger;
}): void => {
	program
		.command('unused')
		.description('Find unused assets')
		.alias('u')
		.action(() => {
			const { filesIncluded, assetsIncluded, filesExcluded, assetsExcluded } =
				getDirectoriesFromConfig({
					logger,
				});

			validateFilesDirectories({
				filesDirs: filesIncluded,
				logger,
				program,
			});
			validateAssetsDirectories({
				assetsDirs: assetsIncluded,
				logger,
				program,
			});

			const assetsList = getFilesList({
				includedDirs: assetsIncluded,
				excludedDirs: assetsExcluded,
			});

			const filesList = getFilesList({
				includedDirs: filesIncluded,
				excludedDirs: filesExcluded,
			}).filter(isInChecklist);

			const importedPaths = getImportedPathsFromFileList(filesList);

			const unusedAssetsList = getUnusedAssetsList({
				assetsList,
				importedPaths,
			});

			logger.notifyInfo(['Unused assets list:', ...unusedAssetsList]);
		});
};
