import chalk from 'chalk';

type ChalkOutput = (...data: unknown[]) => string;
type ConsoleOutput = (...data: unknown[]) => void;

export interface Log {
    debug: Console['debug'];
    error: Console['error'];
    info: Console['info'];
    warn: Console['warn'];

    noDefaultColor: {
        debug: Console['debug'];
        error: Console['error'];
        warn: Console['warn'];
    };
}

function createLog(): Log {
    function logImpl(
        color: ChalkOutput,
        console: ConsoleOutput,
        prefix: string,
        data: unknown[],
        dataColor: boolean = false,
    ) {
        const _data = dataColor ? [color(...data)] : data;

        if (data.some((value) => value !== '')) {
            console(color(prefix), ..._data);
        } else {
            console(..._data);
        }
    }

    return {
        debug: (...data) => logImpl(chalk.blackBright, console.debug, '[cli-debug]', data, true),
        error: (...data) => logImpl(chalk.red, console.error, '[cli-error]', data, true),
        info: (...data) => logImpl(chalk.white, console.info, '[cli-info]', data),
        warn: (...data) => logImpl(chalk.yellow, console.warn, '[cli-warn]', data, true),
        noDefaultColor: {
            debug: (...data) => logImpl(chalk.blackBright, console.debug, '[cli-debug]', data),
            error: (...data) => logImpl(chalk.red, console.error, '[cli-error]', data),
            warn: (...data) => logImpl(chalk.yellow, console.warn, '[cli-warn]', data),
        },
    };
}

export const log = createLog();
