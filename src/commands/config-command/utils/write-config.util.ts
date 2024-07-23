import fs from 'node:fs';
import type { ConfigOptionKey } from 'commands/config-command/types/config-option.type';
import { ILogger } from '../../../types/logger.interface';

export const writeConfig = async ({
	configFilePath,
	newConfig,
	logger,
}: {
	configFilePath: string;
	newConfig: Record<ConfigOptionKey, string>;
	logger: ILogger;
}): Promise<void> => {
	void fs.promises
		.writeFile(configFilePath, JSON.stringify(newConfig, null, 2), 'utf-8')
		.catch((error) => {
			logger.notifyError(['Failed to write config file', error.message]);
		});
};
