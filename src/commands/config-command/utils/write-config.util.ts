import path from 'node:path';
import fs from 'node:fs';
import type { ConfigOptionKey } from 'src/commands/config-command/types/config-option.type';
import { CONFIG_FILE_NAME } from './constants/config-file-name.const.js';

export const writeConfig = async (
	serviceDir: string,
	content: Record<ConfigOptionKey, string>,
): Promise<void> => {
	const configFilePath = path.resolve(
		process.cwd(),
		serviceDir,
		CONFIG_FILE_NAME,
	);

	void fs.promises
		.writeFile(configFilePath, JSON.stringify(content, null, 2), 'utf-8')
		.catch((error) => {
			// todo: add logger
			console.error('Failed to write config file', error);
		});
};
