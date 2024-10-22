import fs from 'node:fs';
import path from 'node:path';

import type { ILogger } from '../types/logger.interface';
import { Command } from 'commander';

/**
 * Validate if the assets directories provided and exist
 * @param assetsDirs The assets directories
 * @param logger The logger service
 * @param program The commander program
 */
export const validateAssetsDirectories = ({
	assetsDirs,
	logger,
	program,
}: {
	assetsDirs: string[];
	logger: ILogger;
	program: Command;
}): void => {
	if (!assetsDirs.length) {
		logger.notifyError(['No assets directory provided']);
		program.help({ error: true });
	}

	assetsDirs.forEach((assetsDir) => {
		if (!fs.existsSync(path.resolve(assetsDir))) {
			logger.notifyError([
				`Assets directory "${assetsDir}" does not exist`,
				'Please check config file',
			]);
			program.help({ error: true });
		}
	});
};
