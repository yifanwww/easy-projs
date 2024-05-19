import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import { useEffect } from 'react';

import { useForceUpdate } from '../useForceUpdate.js';

import { validateHookValueNotChanged } from './helpers.js';

describe(`Test react hook \`${useForceUpdate.name}\``, () => {
    validateHookValueNotChanged('should return the same callback each time', () => [useForceUpdate()]);

    it('should update component when called', () => {
        let renderCount = 0;
        function TestComponent() {
            const forceUpdate = useForceUpdate();
            useEffect(forceUpdate, [forceUpdate]);
            renderCount++;
            return <div />;
        }

        render(<TestComponent />);
        expect(renderCount).toBe(2);
    });
});
