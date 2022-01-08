export const genStr = <T extends (string | false | undefined | null)[]>(...args: T) => args.filter(Boolean).join('');

/**
 * Converts a number to a more readable comma-separated string representation.
 *
 * @param number The number to convert.
 * @returns The more readable string representation.
 */
export function formatNumber(number: number | string): string {
    function getLeft(left: string) {
        const len = left.length;
        const count = Math.ceil(len / 3);
        const arr = new Array<string>(count);

        for (let i = count; i > 0; i--) {
            arr[count - i] = left.slice(Math.max(0, len - i * 3), len - (i - 1) * 3);
        }

        return arr.join(',');
    }

    const getRigth = (right?: string) => (right ? `.${right}` : '');

    const str = String(number).split('.');

    return getLeft(str[0]) + getRigth(str[1]);
}

export function getCurrentTime() {
    const accuracy = 1e9;

    const time = process.hrtime();
    return time[0] + time[1] / accuracy;
}

export function sleep(time: number): void {
    const start = getCurrentTime();
    let curr;
    do {
        curr = getCurrentTime();
    } while (curr - start < time);
}

export function sleepAsync(time: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, time * 1e3);
    });
}

export function getMean(arr: number[]): number {
    return arr.reduce((sum, curr) => sum + curr, 0) / arr.length;
}

export function getVariance(arr: number[], mean: number): number {
    return arr.reduce((sum, curr) => sum + (curr - mean) ** 2, 0) / (arr.length - 1);
}

/**
 * Gets the current timer's minimum resolution (secs).
 */
export function getMinTime() {
    const sample = [];

    // Get average smallest measurable time.
    for (let count = 30; count > 0; count--) {
        const begin = getCurrentTime();

        let measured;
        do {
            const curr = getCurrentTime();
            measured = curr - begin;
        } while (!measured);

        // Check for broken timers.
        if (measured > 0) {
            sample.push(measured);
        } else {
            sample.push(Infinity);
            break;
        }
    }

    // Convert to seconds.
    return getMean(sample);
}
