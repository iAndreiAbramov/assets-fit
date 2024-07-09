import { Command } from 'commander';
import { createServiceDirIfNotExists } from './utils/create-service-dir.util';

export default (program: Command) => {
	program
		.command('config')
		.description('Set configuration options')
		.option('-a, --assets <string>', 'Assets directory path')
		.option('-f, --files <string>', 'Project files directory path')
		.action((args) => {
			const assetsPath = args.assets;
			const filesPath = args.files;

			createServiceDirIfNotExists();
		});
};
