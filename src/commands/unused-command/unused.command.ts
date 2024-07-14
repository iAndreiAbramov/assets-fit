import { Command } from 'commander';
import { ILogger } from '../../types/logger.interface';
import { getDirectoriesFromConfig } from './utils/get-directories-from-config.util.js';
import { getAssetsList } from './utils/get-assets-list.util.js';

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
			const assetsList = getAssetsList(assetsDir);
			console.log(assetsList.length);
		});
};
