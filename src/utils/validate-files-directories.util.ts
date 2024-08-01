import fs from 'node:fs';
import path from 'node:path';
import { Command } from 'commander';
import type { ILogger } from '../types/logger.interface';

/**
 * Validate if the files directories provided and exist
 * @param filesDirs The files directories
 * @param logger The logger service
 * @param program The commander program
 */
export const validateFilesDirectories = ({
	filesDirs,
	logger,
	program,
}: {
	filesDirs: string[];
	logger: ILogger;
	program: Command;
}): void => {
	if (!filesDirs.length) {
		logger.notifyError(['No files directory provided']);
		program.help({ error: true });
	}

	filesDirs.forEach((filesDir) => {
		if (!fs.existsSync(path.resolve(filesDir))) {
			logger.notifyError([
				`Files directory "${filesDir}" does not exist`,
				'Please check config file.',
			]);
			program.help({ error: true });
		}
	});
};
