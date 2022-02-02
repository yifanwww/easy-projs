import { Time } from '../tools/TimeTool';
import { BenchmarkJobSettings } from '../types';
import { _Nanosecond } from '../types.internal';

export class Settings {
    private _delay: _Nanosecond;
    private _initOps: number;
    private _minSampleTime: _Nanosecond;
    private _samplesCount: number;

    public constructor(settings: BenchmarkJobSettings) {
        const { delay = 5, initOps = 16, minSampleTime = 100, samplesCount = 15 } = settings;

        this._delay = Time.ms2ns(delay);
        this._initOps = initOps;
        this._minSampleTime = Time.ms2ns(minSampleTime);
        this._samplesCount = samplesCount;
    }

    public get delay(): _Nanosecond {
        return this._delay;
    }

    public get initOps(): number {
        return this._initOps;
    }

    public get minSampleTime(): _Nanosecond {
        return this._minSampleTime;
    }

    public get samplesCount(): number {
        return this._samplesCount;
    }
}
