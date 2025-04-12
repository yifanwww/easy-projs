export type LogContext<Extra extends object = object> = {
    /**
     * The operator.
     */
    userId?: number;
} & Extra;

interface FactoryOptions {
    context?: LogContext<Record<string, boolean | number | string | undefined>>;
    prefix?: string;
}

export function formatLogFactory(options?: FactoryOptions) {
    const { context: outerContext, prefix } = options ?? {};

    return function formatLog(
        log: string,
        context?: LogContext<Record<string, boolean | number | string | undefined>>,
    ) {
        const mergedContext = {
            ...outerContext,
            ...context,
        };

        const { userId, ...rest } = mergedContext;
        const restLog = Object.entries(rest)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        return [`${prefix ?? ''}${log}`, restLog && `(${restLog})`, userId !== undefined && `[user ${userId}]`]
            .filter(Boolean)
            .join(' ');
    };
}

export const formatLog = formatLogFactory();
