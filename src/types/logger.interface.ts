export interface ILogger {
	notifyInfo(message: string | string[]): void;
	notifyWarning(message: string | string[]): void;
	notifyError(message: string | string[]): void;
}
