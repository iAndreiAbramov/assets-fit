import fs from 'node:fs';
import crypto from 'node:crypto';

export const getFileHashSync = (filePath: string): string => {
	const data = fs.readFileSync(filePath);
	const hash = crypto.createHash('sha256');
	hash.update(data);
	return hash.digest('hex');
};
