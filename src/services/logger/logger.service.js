var _a;
import chalk from 'chalk';
export class LoggerService {
}
_a = LoggerService;
LoggerService.normalizeMessage = (message) => {
    return Array.isArray(message) ? message.join('\n') : message;
};
LoggerService.messageNotify = (message) => {
    console.log(chalk.cyan(_a.normalizeMessage(message)));
};
LoggerService.warnNotify = (message) => {
    console.log(chalk.yellow(_a.normalizeMessage(message)));
};
LoggerService.errorNotify = (message) => {
    console.log(chalk.red(_a.normalizeMessage(message)));
};
//# sourceMappingURL=logger.service.js.map