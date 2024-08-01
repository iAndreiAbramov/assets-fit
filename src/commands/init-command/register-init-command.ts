import { Command } from 'commander';
import type { ILogger } from '../../types/logger.interface';
import { readOrCreateConfigFile } from './utils/read-or-create-config-file.util.js';

export const registerInitCommand = ({
	program,
	logger,
}: {
	program: Command;
	logger: ILogger;
}): void => {
	program
		.command('init')
		.description('Initialize configuration')
		.alias('i')
		.action(() => {
			readOrCreateConfigFile({ logger });
		});
};
