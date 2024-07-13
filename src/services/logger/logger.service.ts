import chalk from 'chalk';

export class LoggerService {
	private normalizeMessage = (message: string | string[]): string => {
		return Array.isArray(message) ? message.join('\n') : message;
	};

	public messageNotify = (message: string | string[]): void => {
		console.log(chalk.cyan(this.normalizeMessage(message)));
	};

	public warnNotify = (message: string | string[]): void => {
		console.log(chalk.yellow(this.normalizeMessage(message)));
	};

	public errorNotify = (message: string | string[]): void => {
		console.log(chalk.red(this.normalizeMessage(message)));
	};
}
