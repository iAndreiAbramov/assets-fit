import type { IConfigOption } from 'commands/config-command/types/config-option.interface';
import { readOrCreateConfig } from './read-or-create-config.util.js';
import { writeConfig } from './write-config.util.js';
import { ILogger } from '../../../types/logger.interface';

export const writeConfigOptions = async ({
	options,
	serviceDir,
	logger,
}: {
	options: IConfigOption[];
	serviceDir: string | undefined;
	logger: ILogger;
}): Promise<void> => {
	if (!serviceDir) {
		logger.errorNotify('Service directory does not exist');
		return;
	}

	const config = await readOrCreateConfig({ serviceDir, logger });
	const newConfig = Object.assign(
		config,
		...options
			.filter(({ value }) => !!value)
			.map(({ option, value }) => ({ [option]: value })),
	);

	void writeConfig({ serviceDir, newConfig, logger });
};
