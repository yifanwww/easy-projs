import type { Nullable } from '@easy-pkg/utils-type';
import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';

import { useIsHovered } from '../useIsHovered';

describe(`Test react hook \`${useIsHovered.name}\``, () => {
    it('should return whether the component is hovered', () => {
        let isHovered: Nullable<boolean> = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isHovered = useIsHovered(ref);
            return <div ref={ref}>Test-Component</div>;
        }

        expect(isHovered).toBeNull();
        const { getByText } = render(<TestComponent />);
        expect(isHovered).toBe(false);

        const component = getByText('Test-Component');

        fireEvent.mouseOver(component);
        expect(isHovered).toBe(true);

        fireEvent.mouseOut(component);
        expect(isHovered).toBe(false);

        fireEvent.mouseEnter(component);
        expect(isHovered).toBe(true);
    });

    it('should not work if disabled', () => {
        let isHovered: Nullable<boolean> = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isHovered = useIsHovered(ref, false);
            return <div ref={ref}>Test-Component</div>;
        }

        expect(isHovered).toBeNull();
        const { getByText } = render(<TestComponent />);
        expect(isHovered).toBe(false);

        const component = getByText('Test-Component');

        fireEvent.mouseOver(component);
        expect(isHovered).toBe(false);

        fireEvent.mouseOut(component);
        expect(isHovered).toBe(false);

        fireEvent.mouseEnter(component);
        expect(isHovered).toBe(false);
    });
});
