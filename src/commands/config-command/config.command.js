import { getOrCreateServiceDir } from './utils/create-service-dir-if-not-exists.util.js';
import { writeConfigOptions } from './utils/write-config-option.util.js';
export const registerConfigCommand = (program) => {
    program
        .command('config')
        .description('Set configuration options')
        .option('-a, --assets <string>', 'Assets directory path')
        .option('-f, --files <string>', 'Project files directory path')
        .action((args) => {
        const assetsPath = args.assets || null;
        const filesPath = args.files || null;
        const serviceDir = getOrCreateServiceDir();
        const options = [
            { option: 'assets', value: assetsPath },
            { option: 'files', value: filesPath },
        ];
        void writeConfigOptions({
            options,
            serviceDir,
        });
    });
};
//# sourceMappingURL=config.command.js.map