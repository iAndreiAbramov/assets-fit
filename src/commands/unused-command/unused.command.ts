import { Command } from 'commander';
import { ILogger } from '../../types/logger.interface';
import { getDirectoriesFromConfig } from './utils/get-directories-from-config.util.js';
import { getFilesList } from './utils/get-files-list.util.js';
import { getImportedPathsFromFileList } from './utils/get-imported-paths-from-file-list.util.js';
import { getUnusedAssetsList } from './utils/get-unused-paths-list.util.js';

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
		.action((args) => {
			const filesDirFromArgs = args.files;
			const assetsDirFromArgs = args.assets;
			const { filesDirFromConfig, assetsDirFromConfig } =
				getDirectoriesFromConfig({ logger });

			const filesDir = filesDirFromArgs || filesDirFromConfig;
			const assetsDir = assetsDirFromArgs || assetsDirFromConfig;
			const assetsList = getFilesList(assetsDir);
			// console.log('assetsList', assetsList);

			const filesList = getFilesList(filesDir);
			// console.log('filesList', filesList);

			const importedPaths = getImportedPathsFromFileList(filesList);
			// console.log('importedPaths', importedPaths);

			const unusedAssetsList = getUnusedAssetsList({
				assetsList,
				importedPathsList: importedPaths,
			});
			console.log('unusedAssetsList', unusedAssetsList);
		});
};
