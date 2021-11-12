import * as package_exports from './index';

it('exports from this package', () => expectSnapshot(Object.keys(package_exports)));

it('Test class `RandomGenerator`', () => {
    const rg = new package_exports.RandomGenerator();

    const str = rg.string(16);
    expect(str.length).toBe(16);
});
