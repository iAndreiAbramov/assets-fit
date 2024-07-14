import path from 'node:path';
import fs from 'node:fs';
import type { ConfigOptionKey } from 'commands/config-command/types/config-option.type';
import { CONFIG_FILE_NAME } from '../../constants/config-file-name.const.js';
import { ILogger } from '../../../types/logger.interface';

export const writeConfig = async ({
	serviceDir,
	logger,
	newConfig,
}: {
	serviceDir: string;
	newConfig: Record<ConfigOptionKey, string>;
	logger: ILogger;
}): Promise<void> => {
	const configFilePath = path.resolve(
		process.cwd(),
		serviceDir,
		CONFIG_FILE_NAME,
	);

	void fs.promises
		.writeFile(configFilePath, JSON.stringify(newConfig, null, 2), 'utf-8')
		.catch((error) => {
			logger.errorNotify(['Failed to write config file', error.message]);
		});
};
