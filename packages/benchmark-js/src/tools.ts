import { TU } from './TimeUnit';
import { _Nanosecond } from './types.internal';

export const genStr = <T extends (string | false | undefined | null)[]>(...args: T) => args.filter(Boolean).join('');

export function sleep(ns: _Nanosecond): void {
    const begin = process.hrtime();
    let duration;
    do {
        duration = process.hrtime(begin);
    } while (TU.hrtime2ns(duration) < ns);
}

export function sleepAsync(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time * 1e3);
    });
}

export function getMean(arr: _Nanosecond[]): _Nanosecond {
    return (arr.reduce((sum, curr) => sum + curr, 0) / arr.length) as _Nanosecond;
}

export function getVariance(arr: number[], mean: number): number {
    return arr.reduce((sum, curr) => sum + (curr - mean) ** 2, 0) / (arr.length - 1);
}

/**
 * Gets the current timer's minimum resolution.
 */
export function getMinTime(): _Nanosecond {
    const samples: _Nanosecond[] = [];

    // Get average smallest measurable time.
    for (let count = 30; count > 0; count--) {
        const begin = process.hrtime();
        const duration = TU.hrtime2ns(process.hrtime(begin));
        samples.push(duration);
    }

    // Calculate the average value.
    return getMean(samples);
}
