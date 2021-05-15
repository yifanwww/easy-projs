function _defaultDiff(prev: any[], curr: any[]): boolean {
    if (curr.length !== prev.length) {
        return true;
    } else {
        for (let i = 0; i < curr.length; i++) {
            if (curr[i] !== prev[i]) return true;
        }
    }

    return false;
}

export function memorize<Args extends any[], ReturnType extends any>(
    func: (...args: Args) => ReturnType,
    diff?: (prev: Args, curr: Args) => boolean,
): (...args: Args) => ReturnType | undefined {
    let prev: Args = ([] as unknown) as Args;

    return function _wrapper(...curr: Args) {
        if (diff) {
            if (diff(prev, curr)) {
                prev = curr;
                return func(...curr);
            }
        } else if (_defaultDiff(prev, curr)) {
            prev = curr;
            return func(...curr);
        }
    };
}
