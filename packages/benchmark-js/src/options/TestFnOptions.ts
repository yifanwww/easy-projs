import { BenchmarkJobTestFnOptions, TestFnArgumentsValues, TestFnArgumentValues } from '../types';
import { _TestFnArguments, _TestFnArgumentValues } from '../types.internal';

export class TestFnOptions {
    private _args: _TestFnArgumentValues[];
    private _argsGroupsCount: number;

    private _preArgs: _TestFnArgumentValues[];
    private _preArgsGroupsCount: number;

    private _argsCount: number;

    constructor(options: BenchmarkJobTestFnOptions) {
        const { args = [], preArgs = [] } = options;

        this._args = this.getArgsValues(args);
        this._preArgs = this.getArgsValues(args, preArgs);

        this._argsCount = Math.max(this._args.length, this._preArgs.length);

        this._argsGroupsCount = this.getGroupsCount(this._args);
        this._preArgsGroupsCount = this.getGroupsCount(this._preArgs);
    }

    private getArgsValues(args1: TestFnArgumentsValues, args2?: TestFnArgumentsValues): _TestFnArgumentValues[] {
        const length = Math.max(args1.length, args2?.length ?? 0);

        const init: TestFnArgumentValues = [];
        const args: _TestFnArgumentValues[] = [];

        for (let i = 0; i < length; i++) {
            const values1 = args1[i] ?? init;
            const values2 = args2?.[i] ?? init;

            if (values1.length === 0 && values2.length === 0) {
                args.push([undefined] as never);
            } else {
                args.push([...values1, ...values2] as never);
            }
        }

        return args;
    }

    private getGroupsCount(args: _TestFnArgumentValues[]): number {
        if (args.length === 0) return 0;

        let count = 1;
        for (const values of args) {
            // values.length won't be zero.
            count *= values.length;
        }

        return count;
    }

    private *getEnumerator(args: _TestFnArgumentValues[]) {
        if (args.length > 0) {
            let count = 1;

            const base = [];
            for (let i = args.length - 1; i >= 0; i--) {
                base.push(count);
                count *= args[i].length;
            }
            base.reverse();

            for (let i = 0; i < count; i++) {
                const _args: _TestFnArguments = [];
                for (let j = 0; j < args.length; j++) {
                    const values = args[j];
                    const index = Math.floor(i / base[j]) % values.length;
                    _args.push(values[index]);
                }
                yield _args;
            }
        }
    }

    public get args(): Generator<_TestFnArguments, void> {
        return this.getEnumerator(this._args);
    }

    public get argsCount(): number {
        return this._argsCount;
    }

    public get argsGroupsCount(): number {
        return this._argsGroupsCount;
    }

    public get preArgs(): Generator<_TestFnArguments, void> {
        return this.getEnumerator(this._preArgs);
    }

    public get preArgsGroupsCount(): number {
        return this._preArgsGroupsCount;
    }
}
