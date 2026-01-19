import { ArrayUtil } from '@easy-pkg/utils';
import type { LoggerService } from '@nestjs/common';
import { Injectable, Scope } from '@nestjs/common';
import type { ForegroundColorName } from 'chalk';
import chalk from 'chalk';
import path from 'node:path';
import winston from 'winston';
import 'winston-daily-rotate-file';

type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'verbose' | 'debug';

interface ILogObject {
    message: string;
    [key: string]: unknown;
}

interface ServerLogger extends winston.Logger {
    // The levels we support
    fatal: winston.LeveledLogMethod;
    error: winston.LeveledLogMethod;
    warn: winston.LeveledLogMethod;
    info: winston.LeveledLogMethod;
    verbose: winston.LeveledLogMethod;
    debug: winston.LeveledLogMethod;

    // The built-in levels we don't support
    help: never;
    data: never;
    prompt: never;
    http: never;
    input: never;
    silly: never;
    emerg: never;
    alert: never;
    crit: never;
    warning: never;
    notice: never;
}

interface TypedTransformableInfo extends winston.Logform.TransformableInfo {
    context?: string;
    timestamp: string;
}

function format(): winston.Logform.Format {
    return winston.format.printf((_info) => {
        const info = _info as TypedTransformableInfo;

        const levelStr = info.level.toUpperCase().padStart(7);
        const contextStr = `[${info.context}]`;
        const messageStr = String(info.message);

        return [info.timestamp, levelStr, contextStr, messageStr].join(' ');
    });
}

function formatColorfully(colors: Record<string, ForegroundColorName>): winston.Logform.Format {
    return winston.format.printf((_info) => {
        const info = _info as TypedTransformableInfo;

        const color = colors[info.level];

        const levelStr = info.level.toUpperCase().padStart(7);
        const contextStr = `[${info.context}]`;
        const messageStr = String(info.message);

        return [info.timestamp, chalk[color](levelStr), chalk.yellow(contextStr), chalk[color](messageStr)].join(' ');
    });
}

@Injectable({ scope: Scope.TRANSIENT })
export class ServerLoggerService implements LoggerService {
    private static _logger?: ServerLogger;

    private static get LOGGER(): ServerLogger {
        ServerLoggerService._logger ??= ServerLoggerService._createLogger();
        return ServerLoggerService._logger;
    }

    private static _createLogger(): ServerLogger {
        const levels: Record<LogLevel, number> = {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            verbose: 4,
            debug: 5,
        };

        const colors: Record<LogLevel, ForegroundColorName> = {
            fatal: 'magentaBright',
            error: 'red',
            warn: 'yellow',
            info: 'green',
            verbose: 'cyan',
            debug: 'blue',
        };

        const timestampFormat = winston.format.timestamp({ format: 'YYYY-MM-DD, HH:mm:ss.SSS' });

        return winston.createLogger({
            transports: ArrayUtil.filterFalsy<winston.transport>([
                new winston.transports.DailyRotateFile({
                    level: process.env.NODE_ENV === 'development' ? 'debug' : 'verbose',
                    dirname: process.env.SERVER_LOG_DIR ?? path.join(process.cwd(), 'logs'),
                    filename: 'server-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxSize: '20m',
                    maxFiles: '30d',
                    format: winston.format.combine(timestampFormat, format()),
                }),
                process.env.NODE_ENV === 'development' &&
                    new winston.transports.Console({
                        level: 'debug',
                        format: winston.format.combine(timestampFormat, formatColorfully(colors)),
                    }),
            ]),
            levels,
        }) as ServerLogger;
    }

    private _context?: string;

    setContext(context: string): void {
        this._context = context;
    }

    /**
     * Write a 'log' level log, if the configured level allows for it.
     */
    log(message: string | ILogObject, context?: string) {
        // eslint-disable-next-line no-param-reassign
        context ??= this._context;

        const logger = ServerLoggerService.LOGGER;

        if (!!message && typeof message === 'object') {
            const { message: msg, ...meta } = message;

            return logger.info(msg, { context, ...meta });
        }

        return logger.info(message, { context });
    }

    /**
     * Write a 'fatal' level log, if the configured level allows for it.
     */
    fatal(message: string | ILogObject, context?: string) {
        // eslint-disable-next-line no-param-reassign
        context ??= this._context;

        const logger = ServerLoggerService.LOGGER;

        if (!!message && typeof message === 'object') {
            const { message: msg, ...meta } = message;

            return logger.fatal(msg, { context, ...meta });
        }

        return logger.fatal(message, { context });
    }

    /**
     * Write an 'error' level log, if the configured level allows for it.
     */
    error(message: string | ILogObject | Error, trace?: string, context?: string) {
        // eslint-disable-next-line no-param-reassign
        context ??= this._context;

        const logger = ServerLoggerService.LOGGER;

        if (message instanceof Error) {
            const { message: msg, name, stack, ...meta } = message;

            return logger.error(msg, { context, stack: [trace ?? message.stack], error: message, ...meta });
        }

        if (!!message && typeof message === 'object') {
            const { message: msg, ...meta } = message;

            return logger.error(msg, { context, stack: [trace], ...meta });
        }

        return logger.error(message, { context, stack: [trace] });
    }

    /**
     * Write a 'warn' level log, if the configured level allows for it.
     */
    warn(message: string | ILogObject, context?: string) {
        // eslint-disable-next-line no-param-reassign
        context ??= this._context;

        const logger = ServerLoggerService.LOGGER;

        if (!!message && typeof message === 'object') {
            const { message: msg, ...meta } = message;

            return logger.warn(msg, { context, ...meta });
        }

        return logger.warn(message, { context });
    }

    /**
     * Write a 'verbose' level log, if the configured level allows for it.
     */
    verbose(message: string | ILogObject, context?: string) {
        // eslint-disable-next-line no-param-reassign
        context ??= this._context;

        const logger = ServerLoggerService.LOGGER;

        if (!!message && typeof message === 'object') {
            const { message: msg, ...meta } = message;

            return logger.verbose(msg, { context, ...meta });
        }

        return logger.verbose(message, { context });
    }

    /**
     * Write a 'debug' level log, if the configured level allows for it.
     */
    debug(message: string | ILogObject, context?: string) {
        // eslint-disable-next-line no-param-reassign
        context ??= this._context;

        const logger = ServerLoggerService.LOGGER;

        if (!!message && typeof message === 'object') {
            const { message: msg, ...meta } = message;

            return logger.debug(msg, { context, ...meta });
        }

        return logger.debug(message, { context });
    }
}
