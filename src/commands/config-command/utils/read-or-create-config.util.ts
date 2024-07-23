import fs from 'node:fs';
import path from 'node:path';
import { CONFIG_FILE_NAME } from '../../constants/config-file-name.const.js';
import { ILogger } from '../../../types/logger.interface';

export const readOrCreateConfigFile = async ({
	configFilePath,
	logger,
}: {
	configFilePath: string;
	logger: ILogger;
}): Promise<Record<string, string>> => {
	let fileData = {};

	if (!fs.existsSync(configFilePath)) {
		try {
			fs.writeFileSync(configFilePath, JSON.stringify(fileData, null, 2), {
				mode: 0o777,
				encoding: 'utf-8',
			});
			return fileData;
		} catch (error) {
			console.error('Failed to create config file\n', error);
			return fileData;
		}
	}

	return await fs.promises
		.readFile(configFilePath, 'utf-8')
		.then((data) => {
			return JSON.parse(data);
		})
		.catch((error) => {
			logger.notifyError(['Failed to read config file', error.message]);
			return fileData;
		});
};
