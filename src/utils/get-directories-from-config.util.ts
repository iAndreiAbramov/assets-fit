import path from 'node:path';
import fs from 'node:fs';

import type { ILogger } from '../types/logger.interface';
import type { IConfigDirectories } from '../commands/unused-command/types/config-directories.interface';
import type { IConfig } from '../types/config.interface';

import { CONFIG_FILE_NAME } from '../commands/constants/config-file-name.const.js';

export const getDirectoriesFromConfig = ({
	logger,
}: {
	logger: ILogger;
}): IConfigDirectories => {
	let result: IConfigDirectories = {
		filesIncluded: [],
		filesExcluded: [],
		assetsIncluded: [],
		assetsExcluded: [],
	};

	try {
		const configFilePath = path.resolve(process.cwd(), CONFIG_FILE_NAME);
		const configFileContent = fs.readFileSync(configFilePath, 'utf-8');
		const config: IConfig = JSON.parse(configFileContent);

		const includedFiles = config?.files?.include || [];
		const excludedFiles = config?.files?.exclude || [];
		const includedAssets = config?.assets?.include || [];
		const excludedAssets = config?.assets?.exclude || [];

		result = {
			assetsIncluded: Array.isArray(includedAssets)
				? includedAssets
				: [includedAssets],
			assetsExcluded: Array.isArray(excludedAssets)
				? excludedAssets
				: [excludedAssets],
			filesIncluded: Array.isArray(includedFiles)
				? includedFiles
				: [includedFiles],
			filesExcluded: Array.isArray(excludedFiles)
				? excludedFiles
				: [excludedFiles],
		};

		return result;
	} catch {
		logger.notifyError('Failed to read from config file');

		return result;
	}
};
