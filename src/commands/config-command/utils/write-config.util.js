import path from 'node:path';
import fs from 'node:fs';
import { CONFIG_FILE_NAME } from './constants/config-file-name.const.js';
import { LoggerService } from 'services/logger/logger.service.js';
export const writeConfig = async (serviceDir, content) => {
    const configFilePath = path.resolve(process.cwd(), serviceDir, CONFIG_FILE_NAME);
    void fs.promises
        .writeFile(configFilePath, JSON.stringify(content, null, 2), 'utf-8')
        .catch((error) => {
        LoggerService.errorNotify(['Failed to write config file', error.message]);
    });
};
//# sourceMappingURL=write-config.util.js.map