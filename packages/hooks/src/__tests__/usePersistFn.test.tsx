import type { Nullable, Optional } from '@easy-pkg/types/utils';
import { assert } from '@easy-pkg/utils-browser';
import { validateHookValueNotChanged } from '@easy-pkg/utils-test';
import { act, render } from '@testing-library/react';
import lodash from 'lodash';
import { useState } from 'react';

import { usePersistFn } from '../usePersistFn.js';

const { noop } = lodash;

describe(`Test react hook \`${usePersistFn.name}\``, () => {
    validateHookValueNotChanged('should return the same callbacks', () => [usePersistFn(noop)]);

    it('should call the latest non-persist function', () => {
        let count: Optional<number>;
        let increaseCount = null as Nullable<() => void>;
        expect(count).toBeUndefined();
        expect(increaseCount).toBeNull();

        function TestComponent() {
            const [_count, _setCount] = useState(0);
            count = _count;
            increaseCount = usePersistFn(() => _setCount(_count + 1));
            return <div />;
        }

        render(<TestComponent />);
        expect(count).toBe(0);
        expect(increaseCount).toBeInstanceOf(Function);
        assert(typeof increaseCount === 'function');

        for (let i = 1; i <= 10; i++) {
            const increaseCountRef = increaseCount;
            act(() => increaseCountRef());
            expect(count).toBe(i);
        }
    });
});
