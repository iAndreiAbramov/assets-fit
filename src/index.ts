#!/usr/bin/env node

import { Command } from 'commander';
import { getVersion } from './utils/get-version.js';
import { registerUnusedCommand } from './commands/unused-command/unused.command.js';
import { LoggerService } from './services/logger/logger.service.js';
import { registerInitCommand } from './commands/init-command/init.command.js';
import { registerDuplicatesCommand } from './commands/duplicate/duplicate.command.js';

const logger = new LoggerService();
const program = new Command();
program
	.version(getVersion(), '-v, --version', 'Outputs the current version')
	.description('A CLI tool for shrinking total project assets size');

registerInitCommand({ program, logger });
registerUnusedCommand({ program, logger });
registerDuplicatesCommand({ program, logger });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp();
}
