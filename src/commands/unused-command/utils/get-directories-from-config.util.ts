import path from 'node:path';
import fs from 'node:fs';

import type { ILogger } from '../../../types/logger.interface';
import type { ConfigOptionKey } from '../../config-command/types/config-option.type';
import type { IConfigDirectories } from '../types/config-directories.interface';

import { CONFIG_FILE_NAME } from '../../constants/config-file-name.const.js';

export const getDirectoriesFromConfig = ({
	logger,
}: {
	logger: ILogger;
}): IConfigDirectories => {
	const result: IConfigDirectories = {
		filesDirFromConfig: null,
		assetsDirFromConfig: null,
	};

	try {
		const configFilePath = path.resolve(process.cwd(), CONFIG_FILE_NAME);
		const configFileContent = fs.readFileSync(configFilePath, 'utf-8');
		const config: Record<ConfigOptionKey, string> =
			JSON.parse(configFileContent);
		result.assetsDirFromConfig = config?.assets || null;
		result.filesDirFromConfig = config?.files || null;

		return result;
	} catch {
		logger.notifyWarning('Failed to read from config file');

		return result;
	}
};
