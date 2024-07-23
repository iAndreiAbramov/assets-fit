import { Command } from 'commander';
import type { ILogger } from '../../types/logger.interface';
import { getDirectoriesFromConfig } from './utils/get-directories-from-config.util.js';
import { getFilesList } from './utils/get-files-list.util.js';
import { getImportedPathsFromFileList } from './utils/get-imported-paths-from-file-list.util.js';
import { getUnusedAssetsList } from './utils/get-unused-paths-list.util.js';
import { isInChecklist } from './utils/is-in-checklist.util.js';
import { validateDirectories } from './utils/validate-directories.util.js';

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
		.option('-a, --assets <string>', 'Assets directory path')
		.option('-f, --files <string>', 'Project files directory path')
		.addHelpText(
			'after',
			'\nAssets and files directories optionally can be set by "config" command, or by editing ".af-config.json" file',
		)
		.action((args) => {
			const filesDirFromArgs = args.files;
			const assetsDirFromArgs = args.assets;
			const { filesDirFromConfig, assetsDirFromConfig } =
				getDirectoriesFromConfig({ logger });

			const filesDir = filesDirFromArgs || filesDirFromConfig;
			const assetsDir = assetsDirFromArgs || assetsDirFromConfig;

			validateDirectories({ assetsDir, filesDir, logger, program });

			const assetsList = getFilesList(assetsDir);
			const filesList = getFilesList(filesDir).filter(isInChecklist);

			const importedPaths = getImportedPathsFromFileList(filesList);

			const unusedAssetsList = getUnusedAssetsList({
				assetsList,
				importedPaths,
			});

			logger.notifyInfo(['Unused assets list:', ...unusedAssetsList]);
		});
};
