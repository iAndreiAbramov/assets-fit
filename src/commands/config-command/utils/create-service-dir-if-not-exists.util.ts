import fs from 'node:fs';
import path from 'node:path';
import { SERVICE_DIR } from './constants/service-dir.const.js';

export const getOrCreateServiceDir = (): string | undefined => {
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
	} catch {
		return;
	}
};
