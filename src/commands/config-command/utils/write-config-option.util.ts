import fs from 'node:fs';
import path from 'node:path';

import type { IConfigOption } from 'commands/config-command/types/config-option.interface';
import type { ILogger } from '../../../types/logger.interface';

import { writeConfig } from './write-config.util.js';
import { CONFIG_FILE_NAME } from '../../constants/config-file-name.const.js';
import { readConfigFromFile } from '../../../utils/read-config-from-file.js';

export const writeConfigOptions = async ({
	options,
	logger,
}: {
	options: IConfigOption[];
	logger: ILogger;
}): Promise<void> => {
	const configFilePath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

	if (!fs.existsSync(configFilePath)) {
		logger.notifyError([
			'Config file does not exist.',
			'Create a ".af-config.json" file in the root of your project.',
		]);
		return;
	}

	const config = readConfigFromFile({ configFilePath });
	const newConfig = Object.assign(
		config,
		...options
			.filter(({ value }) => !!value)
			.map(({ option, value }) => ({ [option]: value })),
	);

	void writeConfig({ configFilePath, newConfig, logger });
};
