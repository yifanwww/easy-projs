import chalk from 'chalk';

type ChalkWrapper = (...data: unknown[]) => string;
type ConsoleOutput = (...data: unknown[]) => void;

export enum LogLevel {
    debug = 1,
    info = 2,
    warn = 3,
    error = 4,
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
        case LogLevel.debug:    return chalk.blackBright;
        case LogLevel.error:    return chalk.red;
        case LogLevel.info:     return chalk.white;
        case LogLevel.warn:     return chalk.yellow;

        default:
            never = level;
            return never;
    }
}

function getConsoleOutput(level: LogLevel): ConsoleOutput {
    let never: never;
    // prettier-ignore
    switch (level) {
        case LogLevel.debug:    return console.debug;
        case LogLevel.error:    return console.error;
        case LogLevel.info:     return console.info;
        case LogLevel.warn:     return console.warn;

        default:
            never = level;
            return never;
    }
}

function createLog(): Log {
    let _level: LogLevel = LogLevel.info;

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
        debug: (...data) => logImpl(LogLevel.debug, '[cli-debug]', data, true),
        error: (...data) => logImpl(LogLevel.error, '[cli-error]', data, true),
        info: (...data) => logImpl(LogLevel.info, '[cli-info]', data, true),
        warn: (...data) => logImpl(LogLevel.warn, '[cli-warn]', data, true),
        noDefaultColor: {
            debug: (...data) => logImpl(LogLevel.debug, '[cli-debug]', data),
            error: (...data) => logImpl(LogLevel.error, '[cli-error]', data),
            info: (...data) => logImpl(LogLevel.info, '[cli-info]', data),
            warn: (...data) => logImpl(LogLevel.warn, '[cli-warn]', data),
        },
        setLogLevel,
    };
}

export const log = createLog();
