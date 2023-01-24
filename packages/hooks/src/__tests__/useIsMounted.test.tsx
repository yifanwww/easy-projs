import type { Optional } from '@easy-pkg/utils-type';
import { render } from '@testing-library/react';

import { useIsMounted } from '../useIsMounted';

describe(`Test react hook \`${useIsMounted.name}\``, () => {
    it('should return whether the component is mounted', () => {
        let isMounted: Optional<() => boolean> = null;
        function TestComponent() {
            isMounted = useIsMounted();
            return <div />;
        }

        expect(isMounted).toBeNull();
        const { unmount } = render(<TestComponent />);
        expect(isMounted!()).toBeTruthy();

        unmount();
        expect(isMounted!()).toBeFalsy();
    });
});
