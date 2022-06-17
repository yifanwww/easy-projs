import { render } from '@testing-library/react';

import { useUnmountEffect } from '../useUnmountEffect';

describe(`Test react hook \`${useUnmountEffect.name}\``, () => {
    it('fires a callback', () => {
        const onUnmount = jest.fn();

        function TestComponent() {
            useUnmountEffect(() => onUnmount());
            return <div />;
        }

        expect(onUnmount).toHaveBeenCalledTimes(0);
        const { unmount } = render(<TestComponent />);
        expect(onUnmount).toHaveBeenCalledTimes(0);
        unmount();
        expect(onUnmount).toHaveBeenCalledTimes(1);
    });
});
