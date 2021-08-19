type Result<T> = { value: T } | undefined;

function defaultDiff(prev: unknown[], curr: unknown[]): boolean {
    if (curr.length !== prev.length) {
        return true;
    } else {
        for (let i = 0; i < curr.length; i++) {
            if (curr[i] !== prev[i]) return true;
        }
    }

    return false;
}

export function memorize<Args extends unknown[], ReturnType extends unknown>(
    fn: (...args: Args) => ReturnType,
    diff?: (prev: Args, curr: Args) => boolean,
): (...args: Args) => ReturnType {
    let prev = [] as unknown as Args;

    // Box the value in an object so we can tell if it's initialized even if the function returns undefined.
    let result: Result<ReturnType>;

    return function memorizeWrapper(...curr: Args) {
        if (result === undefined) {
            prev = curr;
            result = { value: fn(...curr) };
            return result.value;
        }

        const _diff = diff ?? defaultDiff;
        if (_diff(prev, curr)) {
            prev = curr;
            result.value = fn(...curr);
        }

        return result.value;
    };
}
