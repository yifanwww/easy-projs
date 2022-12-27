import { render } from '@testing-library/react';

import { useMountEffect } from '../useMountEffect';

describe(`Test react hook \`${useMountEffect.name}\``, () => {
    it('should fire the callback', () => {
        const onMount = jest.fn();

        function TestComponent() {
            useMountEffect(() => onMount());
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
