import fs from 'node:fs';

/**
 * Get the version of the current package
 * @returns The version of the current package
 */
export const getVersion = (): string => {
	const packageJson = fs.readFileSync('package.json', 'utf-8');
	const { version } = JSON.parse(packageJson);
	return version || 'undetected';
};
