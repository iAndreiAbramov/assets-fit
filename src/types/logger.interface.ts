export interface ILogger {
	messageNotify(message: string | string[]): void;
	warnNotify(message: string | string[]): void;
	errorNotify(message: string | string[]): void;
}
