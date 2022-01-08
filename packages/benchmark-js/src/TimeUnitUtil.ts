import { Millisecond } from './types';
import { _Millisecond, _Nanosecond } from './types.internal';

export class TimeUnitUtil {
    private static accuracy = 1e6;

    public static ms2ns = (ms: Millisecond | _Millisecond): _Nanosecond => (ms * TimeUnitUtil.accuracy) as _Nanosecond;
}
