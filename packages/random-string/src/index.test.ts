import { RandomGenerator } from './index';

describe(`Test class \`${RandomGenerator.name}\``, () => {
    it('should generate random strings', () => {
        const rg = new RandomGenerator();

        const str = rg.string(16);
        expect(str.length).toBe(16);
    });
});
