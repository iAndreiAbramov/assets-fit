import fs from 'node:fs';
import path from 'node:path';
import { Command } from 'commander';
import type { ILogger } from '../../../types/logger.interface';

export const validateDirectories = ({
	assetsDir,
	filesDir,
	logger,
	program,
}: {
	assetsDir: string | null;
	filesDir: string | null;
	logger: ILogger;
	program: Command;
}): void => {
	if (!filesDir) {
		logger.notifyError([
			'No files directory provided',
			'Type af u --help for more information',
		]);
		program.help({ error: true });
	}

	if (!assetsDir) {
		logger.notifyError([
			'No assets directory provided',
			'Type af u --help for more information',
		]);
		program.help({ error: true });
	}

	if (filesDir && !fs.existsSync(path.resolve(filesDir))) {
		logger.notifyError([
			`Files directory "${filesDir}" does not exist`,
			'Please check config file or option you passing to the command',
			'Type af u --help for more information',
		]);
		program.help({ error: true });
	}

	if (assetsDir && !fs.existsSync(assetsDir)) {
		logger.notifyError([
			`Assets directory "${assetsDir}" does not exist`,
			'Please check config file or option you passing to the command',
			'Type af u --help for more information',
		]);
		program.help({ error: true });
	}
};
