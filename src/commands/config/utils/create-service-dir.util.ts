import fs from 'node:fs';
import path from 'node:path';

export const createServiceDirIfNotExists = (): void => {
	const serviceDir = path.join(process.cwd(), '../', SERVICE_DIR);
	if (!fs.existsSync(serviceDir)) {
		fs.mkdirSync(serviceDir);
	}
};
