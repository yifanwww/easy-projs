import chalk from 'chalk';

type ChalkWrapper = (...data: unknown[]) => string;
type ConsoleOutput = (...data: unknown[]) => void;

export enum LogLevel {
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
}

export interface Log {
    debug: Console['debug'];
    error: Console['error'];
    info: Console['info'];
    warn: Console['warn'];

    noDefaultColor: {
        debug: Console['debug'];
        error: Console['error'];
        info: Console['info'];
        warn: Console['warn'];
    };

    setLogLevel(level: LogLevel): void;
}

function getChalkWrapper(level: LogLevel): ChalkWrapper {
    let never: never;
    // prettier-ignore
    switch (level) {
        case LogLevel.Debug:    return chalk.blackBright;
        case LogLevel.Error:    return chalk.red;
        case LogLevel.Info:     return chalk.white;
        case LogLevel.Warn:     return chalk.yellow;

        default:
            never = level;
            return never;
    }
}

function getConsoleOutput(level: LogLevel): ConsoleOutput {
    let never: never;
    // prettier-ignore
    switch (level) {
        case LogLevel.Debug:    return console.debug;
        case LogLevel.Error:    return console.error;
        case LogLevel.Info:     return console.info;
        case LogLevel.Warn:     return console.warn;

        default:
            never = level;
            return never;
    }
}

function createLog(): Log {
    let _level: LogLevel = LogLevel.Info;

    function logImpl(level: LogLevel, prefix: string, data: unknown[], dataColor: boolean = false) {
        if (level < _level) return;

        const color = getChalkWrapper(level);
        const console = getConsoleOutput(level);

        const _data = dataColor ? [color(...data)] : data;

        if (data.some((value) => value !== '')) {
            console(color(prefix), ..._data);
        } else {
            console(..._data);
        }
    }

    function setLogLevel(level: LogLevel): void {
        _level = level;
    }

    return {
        debug: (...data) => logImpl(LogLevel.Debug, '[cli-debug]', data, true),
        error: (...data) => logImpl(LogLevel.Error, '[cli-error]', data, true),
        info: (...data) => logImpl(LogLevel.Info, '[cli-info]', data, true),
        warn: (...data) => logImpl(LogLevel.Warn, '[cli-warn]', data, true),
        noDefaultColor: {
            debug: (...data) => logImpl(LogLevel.Debug, '[cli-debug]', data),
            error: (...data) => logImpl(LogLevel.Error, '[cli-error]', data),
            info: (...data) => logImpl(LogLevel.Info, '[cli-info]', data),
            warn: (...data) => logImpl(LogLevel.Warn, '[cli-warn]', data),
        },
        setLogLevel,
    };
}

export const log = createLog();
