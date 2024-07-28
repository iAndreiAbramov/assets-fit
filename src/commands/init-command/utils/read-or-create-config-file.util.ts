import fs from 'node:fs';
import path from 'node:path';
import { ILogger } from '../../../types/logger.interface';
import { DEFAULT_CONFIG } from '../constants/default-config.js';

const CONFIG_FILE_NAME = '.af.json';

export const readOrCreateConfigFile = ({
	logger,
}: {
	logger: ILogger;
}): void => {
	const configFilePath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

	try {
		if (!fs.existsSync(configFilePath)) {
			fs.writeFileSync(configFilePath, JSON.stringify(DEFAULT_CONFIG), {
				mode: 0o777,
				encoding: 'utf-8',
			});
			logger.notifyInfo('Config file created');
		} else {
			logger.notifyWarning('Config file already exists');
		}
	} catch (error) {
		logger.notifyError(['Error while creating config file']);
	}
};
