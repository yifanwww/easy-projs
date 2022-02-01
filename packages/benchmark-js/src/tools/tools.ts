import { _Nanosecond } from '../types.internal';

export function getMean(arr: _Nanosecond[]): _Nanosecond {
    return (arr.reduce((sum, curr) => sum + curr, 0) / arr.length) as _Nanosecond;
}

export function getVariance(arr: number[], mean: number): number {
    return arr.reduce((sum, curr) => sum + (curr - mean) ** 2, 0) / (arr.length - 1);
}
