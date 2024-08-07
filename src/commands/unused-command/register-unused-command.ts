import { Command } from 'commander';
import type { ILogger } from '../../types/logger.interface';
import { getDirectoriesFromConfig } from '../../utils/get-directories-from-config.util.js';
import { getFilesList } from '../../utils/get-files-list.util.js';
import { getUsagePathsFromFileList } from './utils/get-usage-paths-from-file-list.util.js';
import { getUnusedAssetsList } from './utils/get-unused-assets-list.util.js';
import { shouldBeParsed } from './utils/should-be-parsed.util.js';
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
			}).filter(shouldBeParsed);

			const importedPaths = getUsagePathsFromFileList(filesList);

			const unusedAssetsList = getUnusedAssetsList({
				assetsList,
				usagePaths: importedPaths,
			});

			unusedAssetsList.length > 0
				? logger.notifyInfo(['Unused assets list:', ...unusedAssetsList])
				: logger.notifyInfo(['No unused assets found']);
		});
};
