import { TestFnOptions } from '../TestFnOptions';

describe(`test class \`${TestFnOptions.name}\``, () => {
    it('receives no options', () => {
        const options = new TestFnOptions({});

        expect([...options.args]).toStrictEqual([]);
        expect(options.argsCount).toBe(0);
        expect(options.argsGroupsCount).toBe(0);
        expect([...options.preArgs]).toStrictEqual([]);
        expect(options.preArgsGroupsCount).toBe(0);
    });

    it('receives args', () => {
        const options = new TestFnOptions({ args: [[1, 2], [3], [4, 5]] });

        expect([...options.args]).toStrictEqual([
            [1, 3, 4],
            [1, 3, 5],
            [2, 3, 4],
            [2, 3, 5],
        ]);
        expect(options.argsCount).toBe(3);
        expect(options.argsGroupsCount).toBe(4);
        expect([...options.preArgs]).toStrictEqual([
            [1, 3, 4],
            [1, 3, 5],
            [2, 3, 4],
            [2, 3, 5],
        ]);
        expect(options.preArgsGroupsCount).toBe(4);
    });

    it('receives args and preArgs', () => {
        const options = new TestFnOptions({ args: [[1, 2], [3], [4, 5]], preArgs: [[6], [7], [8, 9]] });

        expect([...options.args]).toStrictEqual([
            [1, 3, 4],
            [1, 3, 5],
            [2, 3, 4],
            [2, 3, 5],
        ]);
        expect(options.argsCount).toBe(3);
        expect(options.argsGroupsCount).toBe(4);
        expect([...options.preArgs]).toStrictEqual([
            [1, 3, 4],
            [1, 3, 5],
            [1, 3, 8],
            [1, 3, 9],
            [1, 7, 4],
            [1, 7, 5],
            [1, 7, 8],
            [1, 7, 9],
            [2, 3, 4],
            [2, 3, 5],
            [2, 3, 8],
            [2, 3, 9],
            [2, 7, 4],
            [2, 7, 5],
            [2, 7, 8],
            [2, 7, 9],
            [6, 3, 4],
            [6, 3, 5],
            [6, 3, 8],
            [6, 3, 9],
            [6, 7, 4],
            [6, 7, 5],
            [6, 7, 8],
            [6, 7, 9],
        ]);
        expect(options.preArgsGroupsCount).toBe(24);
    });

    it('receives args with implicit undefined', () => {
        const options = new TestFnOptions({ args: [[], [3]], preArgs: [[], [], []] });

        expect([...options.args]).toStrictEqual([[undefined, 3]]);
        expect(options.argsCount).toBe(3);
        expect(options.argsGroupsCount).toBe(1);
        expect([...options.preArgs]).toStrictEqual([[undefined, 3, undefined]]);
        expect(options.preArgsGroupsCount).toBe(1);
    });
});
