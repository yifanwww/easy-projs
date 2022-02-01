import chalk from 'chalk';

export enum LogKind {
    Debug = 'debug',
    Info = 'info',
    Error = 'error',
}

type ChalkMiddle = (value: string) => string;

const chalkMiddles = {
    [LogKind.Debug]: chalk.grey as ChalkMiddle,
    [LogKind.Error]: chalk.red as ChalkMiddle,
    [LogKind.Info]: chalk.white as ChalkMiddle,
    always: ((value: string) => value) as ChalkMiddle,
};

export class Logger {
    private name: string;

    public constructor(name: string) {
        this.name = `[${name}] `;
    }

    private logSingleLine(level: LogKind | 'always', value?: string): void {
        if (level === LogKind.Error) {
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

    private logMultiLine(level: LogKind | 'always', value: string): void {
        const lines = value.split('\n');

        for (const line of lines) {
            this.logSingleLine(level, line);
        }
    }

    private log(level: LogKind | 'always', value?: string): void {
        if (value?.includes('\n')) {
            this.logMultiLine(level, value);
        } else {
            this.logSingleLine(level, value);
        }
    }

    public debug = (value?: string) => this.log(LogKind.Debug, value);
    public error = (value?: string) => this.log(LogKind.Error, value);
    public info = (value?: string) => this.log(LogKind.Info, value);

    public write = (value?: string) => this.log('always', value);
}
