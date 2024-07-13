import { readOrCreateConfig } from './read-or-create-config.util.js';
import { writeConfig } from './write-config.util.js';
import { LoggerService } from 'services/logger/logger.service.js';
export const writeConfigOptions = async ({ options, serviceDir, }) => {
    if (!serviceDir) {
        LoggerService.errorNotify('Service directory does not exist');
        return;
    }
    const config = await readOrCreateConfig(serviceDir);
    const newConfig = Object.assign(config, ...options
        .filter(({ value }) => !!value)
        .map(({ option, value }) => ({ [option]: value })));
    void writeConfig(serviceDir, newConfig);
};
//# sourceMappingURL=write-config-option.util.js.map