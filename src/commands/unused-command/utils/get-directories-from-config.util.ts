import path from 'node:path';
import fs from 'node:fs';
import { CONFIG_FILE_NAME } from '../../constants/config-file-name.const.js';
import { SERVICE_DIR } from '../../constants/service-dir.const.js';
import { ILogger } from '../../../types/logger.interface';
import { ConfigOptionKey } from '../../config-command/types/config-option.type';
import { IConfigDirectories } from '../types/config-directories.interface';

export const getDirectoriesFromConfig = ({
	logger,
}: {
	logger: ILogger;
}): IConfigDirectories => {
	const result: IConfigDirectories = {
		filesDirFromConfig: null,
		assetsDirFromConfig: null,
	};
	const configFilePath = path.join(SERVICE_DIR, CONFIG_FILE_NAME);

	try {
		const configFileContent = fs.readFileSync(configFilePath, 'utf-8');
		const config: Record<ConfigOptionKey, string> =
			JSON.parse(configFileContent);
		result.assetsDirFromConfig = config?.assets || null;
		result.filesDirFromConfig = config?.files || null;
	} catch {
		logger.warnNotify('Failed to read from config files');
		return result;
	}

	return result;
};
