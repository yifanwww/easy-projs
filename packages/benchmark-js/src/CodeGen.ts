import { TestFn } from './types';
import { Hrtime } from './types.internal';

export interface TesterContext {
    count: number;
    setup?: () => void;
    teardown?: () => void;
    testFn: TestFn;
}

export type Tester = (context: TesterContext) => Hrtime;

export class CodeGen {
    private static cgid: number = 0;

    private id: string;

    public static createTester = () => new CodeGen().createTester();

    public constructor() {
        CodeGen.cgid++;
        this.id = CodeGen.cgid.toString();
    }

    private interpolate(str: string) {
        return str.replace(/#/g, this.id);
    }

    public createTester(): Tester {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        return Function(
            this.interpolate('context#'),
            this.interpolate(
                `
context#.setup?.();

const testFn# = context#.testFn;

const begin# = process.hrtime();
for (let i# = 0; i# < context#.count; i#++) {
    testFn#();
}
const elapsed# = process.hrtime(begin#);

context#.teardown?.();

return elapsed#;
`.trim(),
            ),
        ) as Tester;
    }
}
