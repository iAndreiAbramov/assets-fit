import fs from 'node:fs';
import path from 'node:path';
import { Command } from 'commander';
import type { ILogger } from '../../../types/logger.interface';

export const validateDirectories = ({
	assetsDirs,
	filesDirs,
	logger,
	program,
}: {
	assetsDirs: string[];
	filesDirs: string[];
	logger: ILogger;
	program: Command;
}): void => {
	if (!filesDirs.length) {
		logger.notifyError(['No files directory provided']);
		program.help({ error: true });
	}

	if (!assetsDirs.length) {
		logger.notifyError(['No assets directory provided']);
		program.help({ error: true });
	}

	filesDirs.forEach((filesDir) => {
		if (!fs.existsSync(path.resolve(filesDir))) {
			logger.notifyError([
				`Files directory "${filesDir}" does not exist`,
				'Please check config file or option you passing to the command',
				'Type af u --help for more information',
			]);
			program.help({ error: true });
		}
	});

	assetsDirs.forEach((assetsDir) => {
		if (!fs.existsSync(assetsDir)) {
			logger.notifyError([
				`Assets directory "${assetsDir}" does not exist`,
				'Please check config file or option you passing to the command',
				'Type af u --help for more information',
			]);
			program.help({ error: true });
		}
	});
};
