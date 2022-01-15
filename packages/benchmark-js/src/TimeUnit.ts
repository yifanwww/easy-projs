import { Millisecond } from './types';
import { _Millisecond, _Nanosecond } from './types.internal';

export class TimeUnit {
    private static accuracy = 1e6;

    public static ns = (ns: number): _Nanosecond => ns as _Nanosecond;

    public static ms2ns = (ms: Millisecond | _Millisecond): _Nanosecond => (ms * TimeUnit.accuracy) as _Nanosecond;

    public static hrtime2ns = (hrtime: [number, number]): _Nanosecond => (hrtime[0] * 1e9 + hrtime[1]) as _Nanosecond;
}

export { TimeUnit as TU };
