import { Command } from 'commander';
import { ILogger } from '../../types/logger.interface';

export const registerUnusedCommand = ({
	program,
	logger,
}: {
	program: Command;
	logger: ILogger;
}): void => {
	program
		.command('unused')
		.description('Find unused assets')
		.option('-a, --assets <string>', 'Assets directory path')
		.option('-f, --files <string>', 'Project files directory path')
		.action((args) => {
			console.log('args', args);
		});
};
