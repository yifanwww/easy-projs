import { expectSnapshot } from '@easy/utils-test';

import * as package_exports from './index';

it('exports from this package', () => expectSnapshot(Object.keys(package_exports)));
