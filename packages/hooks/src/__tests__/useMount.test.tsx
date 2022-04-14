import { render } from '@testing-library/react';

import { useMountEffect } from '../useMountEffect';

describe(`Test react hook \`${useMountEffect.name}\``, () => {
    it('fires a callback', () => {
        const onMount = jest.fn();

        function TestComponent() {
            useMountEffect(() => onMount());
            return <div />;
        }

        expect(onMount).toBeCalledTimes(0);
        const { unmount } = render(<TestComponent />);
        expect(onMount).toBeCalledTimes(1);
        unmount();
        expect(onMount).toBeCalledTimes(1);
    });
});
