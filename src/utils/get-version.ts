import fs from 'node:fs';

export const getVersion = (): string => {
	const packageJson = fs.readFileSync('package.json', 'utf-8');
	const { version } = JSON.parse(packageJson);
	return version || 'undetected';
};
