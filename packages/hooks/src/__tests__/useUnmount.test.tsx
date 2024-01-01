import { render } from '@testing-library/react';

import { useUnmount } from '../useUnmount.js';

describe(`Test react hook \`${useUnmount.name}\``, () => {
    it('should fire the callback', () => {
        const onUnmount = jest.fn();

        function TestComponent() {
            useUnmount(() => {
                onUnmount();
            });
            return <div />;
        }

        expect(onUnmount).toHaveBeenCalledTimes(0);
        const { rerender, unmount } = render(<TestComponent />);
        expect(onUnmount).toHaveBeenCalledTimes(0);
        rerender(<TestComponent />);
        expect(onUnmount).toHaveBeenCalledTimes(0);
        unmount();
        expect(onUnmount).toHaveBeenCalledTimes(1);
    });
});
