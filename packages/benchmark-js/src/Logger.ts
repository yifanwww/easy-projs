import chalk from 'chalk';

export enum BenchmarkLoggerLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

const LoggerOrder = {
    [BenchmarkLoggerLevel.Debug]: 1,
    [BenchmarkLoggerLevel.Error]: 2,
    [BenchmarkLoggerLevel.Info]: 3,
    [BenchmarkLoggerLevel.Warn]: 4,
};

const ChalkColor = {
    [BenchmarkLoggerLevel.Debug]: chalk.grey,
    [BenchmarkLoggerLevel.Error]: chalk.red,
    [BenchmarkLoggerLevel.Info]: chalk.white,
    [BenchmarkLoggerLevel.Warn]: chalk.yellow,
};

export class Logger {
    public static level = BenchmarkLoggerLevel.Warn;

    private _name: string;

    public constructor(name: string) {
        this._name = `[${name}] `;
    }

    private _log(level: BenchmarkLoggerLevel | false, ...message: unknown[]) {
        let msgs: unknown[];
        if (message.length === 0) msgs = message;
        else msgs = [this._name, ...message];

        if (level === false) {
            // eslint-disable-next-line no-console
            console.info(...msgs);
        } else {
            if (LoggerOrder[level] < LoggerOrder[Logger.level]) return;

            // eslint-disable-next-line no-console
            console[level](ChalkColor[level](...msgs));
        }
    }

    public debug = (...message: unknown[]) => this._log(BenchmarkLoggerLevel.Debug, ...message);
    public error = (...message: unknown[]) => this._log(BenchmarkLoggerLevel.Error, ...message);
    public info = (...message: unknown[]) => this._log(BenchmarkLoggerLevel.Info, ...message);
    public warn = (...message: unknown[]) => this._log(BenchmarkLoggerLevel.Warn, ...message);

    public write = (...message: unknown[]) => this._log(false, ...message);
}
