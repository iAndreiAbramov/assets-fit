import { Command } from 'commander';
import type { ILogger } from '../../types/logger.interface';
import { getDirectoriesFromConfig } from '../../utils/get-directories-from-config.util.js';
import { validateAssetsDirectories } from '../../utils/validate-assets-directories.util.js';
import { getFilesList } from '../../utils/get-files-list.util.js';
import { getDuplicateFiles } from './utils/get-duplicate-files.util.js';

export const registerDuplicatesCommand = ({
	program,
	logger,
}: {
	program: Command;
	logger: ILogger;
}) => {
	program
		.command('duplicate')
		.description('Find duplicate assets')
		.alias('d')
		.action(async () => {
			const { assetsIncluded, assetsExcluded } = getDirectoriesFromConfig({
				logger,
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

			const duplicates = await getDuplicateFiles(assetsList);

			duplicates.length > 0
				? logger.notifyInfo([
						'Files that have similar content:',
						...duplicates.reduce((acc, files) => {
							acc.push('--------------------------------');
							acc.push(...files);
							return acc;
						}),
					])
				: logger.notifyInfo(['No duplicate assets found']);
		});
};
