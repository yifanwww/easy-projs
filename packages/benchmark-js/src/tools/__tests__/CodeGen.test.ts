import { expectSnapshot } from '@easy/utils-test';
import { CodeGen } from '../CodeGen';

describe(`test method \`${CodeGen.name}\``, () => {
    it('create tester with 0 argument', () => {
        const tester = CodeGen.createTester({ argument: { count: 0 } });
        expectSnapshot(tester.toString());
    });

    it('create tester with 1 argument', () => {
        const tester = CodeGen.createTester({ argument: { count: 1 } });
        expectSnapshot(tester.toString());
    });

    it('create tester with 2 arguments', () => {
        const tester = CodeGen.createTester({ argument: { count: 2 } });
        expectSnapshot(tester.toString());
    });

    it('create tester with 3 arguments', () => {
        const tester = CodeGen.createTester({ argument: { count: 3 } });
        expectSnapshot(tester.toString());
    });

    it('create tester with 4 arguments', () => {
        const tester = CodeGen.createTester({ argument: { count: 4 } });
        expectSnapshot(tester.toString());
    });

    it('create tester with rest arguments', () => {
        const tester = CodeGen.createTester({ argument: { count: 0, rest: true } });
        expectSnapshot(tester.toString());
    });
});
