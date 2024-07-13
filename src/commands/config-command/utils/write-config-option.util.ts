import type { IConfigOption } from 'src/commands/config-command/types/config-option.interface';
import { readOrCreateConfig } from './read-or-create-config.util.js';
import { writeConfig } from './write-config.util.js';

export const writeConfigOptions = async ({
	options,
	serviceDir,
}: {
	options: IConfigOption[];
	serviceDir: string | undefined;
}): Promise<void> => {
	if (!serviceDir) {
		// todo: add logger
		console.error('Service directory does not exist');
		return;
	}

	const config = await readOrCreateConfig(serviceDir);
	const newConfig = Object.assign(
		config,
		...options
			.filter(({ value }) => !!value)
			.map(({ option, value }) => ({ [option]: value })),
	);

	void writeConfig(serviceDir, newConfig);
};
