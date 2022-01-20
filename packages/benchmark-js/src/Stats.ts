import { tTable } from './constants';
import { Formatter } from './Formatter';
import { getMean, getVariance } from './tools';
import { _Nanosecond } from './types.internal';

/**
 * Class for stats including mean, margin or error, and standard deviation.
 */
export class Stats {
    /**
     * The array of sampled periods.
     */
    private _samples: _Nanosecond[];
    /**
     * The sample arithmetic mean (secs).
     */
    private _mean: _Nanosecond;

    /**
     * The sample standard deviation.
     */
    private _deviation: number;
    /**
     * The margin of error.
     */
    private _moe: number;
    /**
     * The relative margin of error (expressed as a percentage of the mean).
     */
    private _rme: number;
    /**
     * The standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean).
     */
    private _sem: number;
    /**
     * The sample variance.
     */
    private _variance: number;

    /**
     * The number of executions per second.
     */
    private _ops: number;

    public constructor(samples: _Nanosecond[]) {
        this._samples = samples;

        const size = samples.length;
        this._mean = getMean(samples);
        this._variance = getVariance(samples, this._mean);
        this._deviation = Math.sqrt(this._variance);
        this._sem = this._deviation / Math.sqrt(size);
        const critical = tTable[size - 1] ?? tTable.infinity;
        this._moe = this._sem * critical;
        this._rme = (this._moe / this._mean) * 100 ?? 0;

        this._ops = 1e9 / this._mean;
    }

    public get samples(): _Nanosecond[] {
        return this._samples;
    }

    public get rme(): number {
        return this._rme;
    }

    public get ops(): number {
        return this._ops;
    }

    public toString(order?: number): string {
        const size = this._samples.length;

        const opsStr = Formatter.beautifyNumber(this._ops.toFixed(this._ops < 100 ? 2 : 0));
        const rmeStr = this._rme.toFixed(2);

        return [
            order ? `${order} >` : '',
            `${opsStr} ops/sec`,
            ` ${rmeStr}%`,
            ` (${size} sample${size > 1 ? 's' : ''})`,
        ].join('');
    }
}
