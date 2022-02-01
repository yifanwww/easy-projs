import { Time } from '../tools/TimeTool';
import { BenchmarkJobSettings } from '../types';
import { _Nanosecond } from '../types.internal';

export class Settings {
    private static minTime: _Nanosecond = Time.ns(Math.max(Time.minResolution * 100, 50_000_000));

    private _delay: _Nanosecond;
    private _initCount: number;
    private _maxAdjustTime: _Nanosecond;
    private _maxPreparingTime: _Nanosecond;
    private _maxTime: _Nanosecond;
    private _minSamples: number;
    private _minTime: _Nanosecond;

    public constructor(settings: BenchmarkJobSettings) {
        const {
            delay = 5,
            initCount = 1,
            maxAdjustTime = 100,
            maxPreparingTime = 10,
            maxTime = 5_000,
            minSamples = 5,
            minTime = 0,
        } = settings;

        this._delay = Time.ms2ns(delay);
        this._initCount = initCount;
        this._maxAdjustTime = Time.ms2ns(maxAdjustTime);
        this._maxPreparingTime = Time.ms2ns(maxPreparingTime);
        this._maxTime = Time.ms2ns(maxTime);
        this._minSamples = minSamples;
        this._minTime = minTime === 0 ? Settings.minTime : Time.ms2ns(minTime);
    }

    public get delay(): _Nanosecond {
        return this._delay;
    }

    public get initCount(): number {
        return this._initCount;
    }

    public get maxAdjustTime(): _Nanosecond {
        return this._maxAdjustTime;
    }

    public get maxPreparingTime(): _Nanosecond {
        return this._maxPreparingTime;
    }

    public get maxTime(): _Nanosecond {
        return this._maxTime;
    }

    public get minSamples(): number {
        return this._minSamples;
    }

    public get minTime(): _Nanosecond {
        return this._minTime;
    }
}
