import fs from 'node:fs';

export const readConfigFromFile = ({ configFilePath }: {
	configFilePath: string,
}): Record<string, string> => {
	try {
		const configFileContent = fs.readFileSync(configFilePath, 'utf-8');
		return JSON.parse(configFileContent);
	} catch {
		return {};
	}
};
