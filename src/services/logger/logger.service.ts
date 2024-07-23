import chalk from 'chalk';
import type { ILogger } from '../../types/logger.interface';

export class LoggerService implements ILogger {
	private normalizeMessage = (message: string | string[]): string => {
		return Array.isArray(message) ? message.join('\n') : message;
	};

	public notifyInfo = (message: string | string[]): void => {
		console.log(chalk.cyan(this.normalizeMessage(message)));
	};

	public notifyWarning = (message: string | string[]): void => {
		console.log(chalk.yellow(this.normalizeMessage(message)));
	};

	public notifyError = (message: string | string[]): void => {
		console.log(chalk.red(this.normalizeMessage(message)));
	};
}
