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

export function memorize<Args extends unknown[], Return>(
    fn: (...args: Args) => Return,
    diff?: (prev: Args, curr: Args) => boolean,
): (...args: Args) => Return {
    let prev = [] as unknown as Args;

    // Box the value in an object so we can tell if it's initialized even if the function returns undefined.
    let result: Result<Return>;

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
