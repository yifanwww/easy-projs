import chalk from 'chalk';

export enum BenchmarkLoggerLevel {
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
}

const loggerOrder = {
    [BenchmarkLoggerLevel.Debug]: 1,
    [BenchmarkLoggerLevel.Error]: 2,
    [BenchmarkLoggerLevel.Info]: 3,
    [BenchmarkLoggerLevel.Warn]: 4,
    always: 5,
};

type ChalkMiddle = (value: string) => string;

const chalkMiddles = {
    [BenchmarkLoggerLevel.Debug]: chalk.grey as ChalkMiddle,
    [BenchmarkLoggerLevel.Error]: chalk.red as ChalkMiddle,
    [BenchmarkLoggerLevel.Info]: chalk.white as ChalkMiddle,
    [BenchmarkLoggerLevel.Warn]: chalk.yellow as ChalkMiddle,
    always: ((value: string) => value) as ChalkMiddle,
};

export class Logger {
    public static level = BenchmarkLoggerLevel.Warn;

    private name: string;

    public constructor(name: string) {
        this.name = `[${name}] `;
    }

    private logSingleLine(level: BenchmarkLoggerLevel | 'always', value?: string): void {
        if (level === BenchmarkLoggerLevel.Error) {
            if (value) {
                process.stderr.write(chalkMiddles[level](this.name));
                process.stderr.write(chalkMiddles[level](value));
            }
            process.stderr.write('\n');
        } else {
            if (value) {
                process.stdout.write(chalkMiddles[level](this.name));
                process.stdout.write(chalkMiddles[level](value));
            }
            process.stdout.write('\n');
        }
    }

    private logMultiLine(level: BenchmarkLoggerLevel | 'always', value: string): void {
        const lines = value.split('\n');

        for (const line of lines) {
            this.logSingleLine(level, line);
        }
    }

    private log(level: BenchmarkLoggerLevel | 'always', value?: string): void {
        if (loggerOrder[level] < loggerOrder[Logger.level]) return;

        if (value?.includes('\n')) {
            this.logMultiLine(level, value);
        } else {
            this.logSingleLine(level, value);
        }
    }

    public debug = (value?: string) => this.log(BenchmarkLoggerLevel.Debug, value);
    public error = (value?: string) => this.log(BenchmarkLoggerLevel.Error, value);
    public info = (value?: string) => this.log(BenchmarkLoggerLevel.Info, value);
    public warn = (value?: string) => this.log(BenchmarkLoggerLevel.Warn, value);

    public write = (value?: string) => this.log('always', value);
}
