import chalk from 'chalk';

export enum LoggerLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

const LoggerOrder = {
    [LoggerLevel.Debug]: 1,
    [LoggerLevel.Error]: 2,
    [LoggerLevel.Info]: 3,
    [LoggerLevel.Warn]: 4,
};

const LoggerPrefix = {
    [LoggerLevel.Debug]: '[Debug]',
    [LoggerLevel.Error]: '[Error]',
    [LoggerLevel.Info]: '',
    [LoggerLevel.Warn]: '[Warn]',
};

const ChalkColor = {
    [LoggerLevel.Debug]: chalk.grey,
    [LoggerLevel.Error]: chalk.red,
    [LoggerLevel.Info]: chalk.white,
    [LoggerLevel.Warn]: chalk.yellow,
};

export class Logger {
    public static level = LoggerLevel.Warn;

    private static _log(level: LoggerLevel, ...message: string[]) {
        if (LoggerOrder[level] < LoggerOrder[Logger.level]) return;

        // eslint-disable-next-line no-console
        console[level](ChalkColor[level](LoggerPrefix[level]), ...message);
    }

    public static debug = (...message: string[]) => Logger._log(LoggerLevel.Debug, ...message);
    public static error = (...message: string[]) => Logger._log(LoggerLevel.Error, ...message);
    public static info = (...message: string[]) => Logger._log(LoggerLevel.Info, ...message);
    public static warn = (...message: string[]) => Logger._log(LoggerLevel.Warn, ...message);

    // eslint-disable-next-line no-console
    public static log = (...message: string[]) => console.info(...message);
}
