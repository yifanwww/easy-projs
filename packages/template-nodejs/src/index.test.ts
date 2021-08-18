import * as package_exports from './index';

test('Test all exports from this package', () => expectSnapshot(Object.keys(package_exports)));

test('Test function `templateNodejs`', () => expectSnapshot(package_exports.templateNodejs()));
