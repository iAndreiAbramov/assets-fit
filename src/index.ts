#!/usr/bin/env node

import { Command } from 'commander';
import { getVersion } from './utils/get-version.js';
import { registerConfigCommand } from './commands/config-command/config.command.js';
import { registerUnusedCommand } from './commands/unused-command/unused.command.js';

const program = new Command();
program
	.version(getVersion(), '-v, --version', 'Outputs the current version')
	.description('A CLI tool for managing static assets');

registerConfigCommand(program);
registerUnusedCommand(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.outputHelp();
}
