import { jest } from '@jest/globals';
import { render } from '@testing-library/react';

import { useMount } from '../useMount.js';

describe(`Test react hook \`${useMount.name}\``, () => {
    it('should fire the callback', () => {
        const onMount = jest.fn();

        function TestComponent() {
            useMount(() => {
                onMount();
            });
            return <div />;
        }

        expect(onMount).toHaveBeenCalledTimes(0);
        const { rerender, unmount } = render(<TestComponent />);
        expect(onMount).toHaveBeenCalledTimes(1);
        rerender(<TestComponent />);
        expect(onMount).toHaveBeenCalledTimes(1);
        unmount();
        expect(onMount).toHaveBeenCalledTimes(1);
    });
});
