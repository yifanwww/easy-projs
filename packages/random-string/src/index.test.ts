import { describe, expect, it } from '@jest/globals';

import { RandomGenerator } from './index.js';

describe(`Test class \`${RandomGenerator.name}\``, () => {
    it('should generate random strings', () => {
        const rg = new RandomGenerator();

        const str = rg.string(16);
        expect(str).toHaveLength(16);
    });
});
