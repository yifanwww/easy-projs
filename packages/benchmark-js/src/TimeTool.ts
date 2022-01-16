import { getMean } from './tools';
import { Millisecond } from './types';
import { _Millisecond, _Nanosecond } from './types.internal';

export class TimeTool {
    private static accuracy = 1e6;

    private static _minresolution = 0;

    public static ns = (ns: number): _Nanosecond => ns as _Nanosecond;

    public static ms2ns = (ms: Millisecond | _Millisecond): _Nanosecond => (ms * TimeTool.accuracy) as _Nanosecond;

    public static hrtime2ns = (hrtime: [number, number]): _Nanosecond => (hrtime[0] * 1e9 + hrtime[1]) as _Nanosecond;

    public static sleep(ns: _Nanosecond): void {
        const begin = process.hrtime();
        let duration;
        do {
            duration = process.hrtime(begin);
        } while (TimeTool.hrtime2ns(duration) < ns);
    }

    /**
     * Gets the current timer's minimum resolution.
     */
    private static getMinResolution(): _Nanosecond {
        const samples: _Nanosecond[] = [];

        // The first few measurement times we got weren't stable enough, so dropped them.
        for (let count = 20; count > 0; count--) {
            process.hrtime(process.hrtime());
        }

        // Get average smallest measurable time.
        for (let count = 200; count > 0; count--) {
            const measured = process.hrtime(process.hrtime());
            samples.push(TimeTool.hrtime2ns(measured));
        }

        // Calculate the average value.
        return getMean(samples);
    }

    public static get minResolution() {
        if (TimeTool._minresolution === 0) {
            TimeTool._minresolution = TimeTool.getMinResolution();
        }
        return TimeTool._minresolution;
    }
}

export { TimeTool as Time };
