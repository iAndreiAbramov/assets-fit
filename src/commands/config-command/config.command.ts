import { Command } from 'commander';
import { getOrCreateServiceDir } from './utils/create-service-dir-if-not-exists.util.js';
import { writeConfigOptions } from './utils/write-config-option.util.js';
import type { IConfigOption } from './types/config-option.interface';
import { ILogger } from '../../types/logger.interface';

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
			const assetsPath = args.assets || null;
			const filesPath = args.files || null;

			const serviceDir = getOrCreateServiceDir();
			const options: IConfigOption[] = [
				{ option: 'assets', value: assetsPath },
				{ option: 'files', value: filesPath },
			];

			void writeConfigOptions({
				options,
				serviceDir,
				logger,
			});
		});
};
