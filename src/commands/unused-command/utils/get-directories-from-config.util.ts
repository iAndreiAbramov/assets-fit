import path from 'node:path';
import fs from 'node:fs';

import type { ILogger } from '../../../types/logger.interface';
import type { IConfigDirectories } from '../types/config-directories.interface';

import { CONFIG_FILE_NAME } from '../../constants/config-file-name.const.js';
import type { IConfig } from '../../../types/config.interface';

export const getDirectoriesFromConfig = ({
	logger,
}: {
	logger: ILogger;
}): IConfigDirectories => {
	const result: IConfigDirectories = {
		filesIncluded: [],
		filesExcluded: [],
		assetsIncluded: [],
		assetsExcluded: [],
	};

	try {
		const configFilePath = path.resolve(process.cwd(), CONFIG_FILE_NAME);
		const configFileContent = fs.readFileSync(configFilePath, 'utf-8');
		const config: IConfig = JSON.parse(configFileContent);

		result.filesIncluded = config?.files?.include || [];
		result.filesExcluded = config?.files?.exclude || [];
		result.assetsIncluded = config?.assets?.include || [];
		result.assetsExcluded = config?.assets?.exclude || [];

		return result;
	} catch {
		logger.notifyError('Failed to read from config file');

		return result;
	}
};
