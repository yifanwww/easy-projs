import { BenchmarkTestFnOptions } from './types';
import { _TestFnArguments, _TestFnArgumentValues } from './types.internal';

export class TestFnOptions {
    private _args: _TestFnArgumentValues[];
    private _argsGroupsCount: number;

    constructor(options: BenchmarkTestFnOptions) {
        const { args = [] } = options;

        this._args = [];
        for (const values of args) {
            if (values.length === 0) {
                this._args.push([undefined] as never);
            } else {
                this._args.push([...values] as never);
            }
        }

        this._argsGroupsCount = this.getGroupsCount();
    }

    private getGroupsCount(): number {
        if (this._args.length === 0) return 0;

        let res = 1;
        for (const values of this._args) {
            // values.length won't be zero.
            res *= values.length;
        }

        return res;
    }

    private *getEnumerator() {
        for (let i = 0; i < this._argsGroupsCount; i++) {
            const args: _TestFnArguments = [];
            for (const values of this._args) {
                args.push(values[i % values.length]);
            }
            yield args;
        }
    }

    public get args(): Generator<_TestFnArguments, void> {
        return this.getEnumerator();
    }

    public get argsCount(): number {
        return this._args.length;
    }

    public get argsGroupsCount(): number {
        return this._argsGroupsCount;
    }
}
