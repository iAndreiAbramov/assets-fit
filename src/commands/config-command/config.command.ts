import { Command } from 'commander';
import { writeConfigOptions } from './utils/write-config-option.util.js';
import type { IConfigOption } from './types/config-option.interface';
import type { ILogger } from 'types/logger.interface';

export const registerConfigCommand = ({
	program,
	logger,
}: {
	program: Command;
	logger: ILogger;
}): void => {
	program
		.command('config')
		.description('Set configuration options')
		.alias('c')
		.option('-a, --assets <string>', 'Assets directory path')
		.option('-f, --files <string>', 'Project files directory path')
		.action((args) => {
			if (Object.keys(args).length === 0) {
				logger.notifyError('No options provided');
				program.help();
			}

			const assetsPath = args.assets || null;
			const filesPath = args.files || null;

			const options: IConfigOption[] = [
				{ option: 'assets', value: assetsPath },
				{ option: 'files', value: filesPath },
			];

			void writeConfigOptions({
				options,
				logger,
			});
		});
};
