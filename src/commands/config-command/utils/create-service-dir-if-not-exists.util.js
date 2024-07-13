import fs from 'node:fs';
import path from 'node:path';
import { SERVICE_DIR } from './constants/service-dir.const.js';
export const getOrCreateServiceDir = () => {
    const serviceDir = path.join(process.cwd(), SERVICE_DIR);
    if (fs.existsSync(serviceDir)) {
        return serviceDir;
    }
    try {
        fs.mkdirSync(serviceDir, {
            mode: 0o777,
            recursive: true,
        });
        return serviceDir;
    }
    catch {
        return;
    }
};
//# sourceMappingURL=create-service-dir-if-not-exists.util.js.map