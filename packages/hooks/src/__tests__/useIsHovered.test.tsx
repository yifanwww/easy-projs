import type { Nullable } from '@easy-pkg/types';
import { describe, expect, it } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';

import { useIsHovered } from '../useIsHovered.js';

describe(`Test react hook \`${useIsHovered.name}\``, () => {
    it('should return whether the component is hovered', () => {
        let isHovered: Nullable<boolean> = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isHovered = useIsHovered(ref);
            return <div ref={ref}>target</div>;
        }

        expect(isHovered).toBeNull();
        const { getByText } = render(<TestComponent />);
        expect(isHovered).toBe(false);

        const target = getByText('target');

        fireEvent.mouseOver(target);
        expect(isHovered).toBe(true);

        fireEvent.mouseOut(target);
        expect(isHovered).toBe(false);

        fireEvent.mouseEnter(target);
        expect(isHovered).toBe(true);
    });

    it('should return whether the component is hovered even if there is a mask', () => {
        let isHovered: Nullable<boolean> = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            const maskRef = useRef<HTMLDivElement>(null);
            isHovered = useIsHovered(ref, maskRef);
            return (
                <div>
                    <div ref={ref}>target</div>
                    <div ref={maskRef}>mask</div>
                </div>
            );
        }

        expect(isHovered).toBeNull();
        const { getByText } = render(<TestComponent />);
        expect(isHovered).toBe(false);

        const target = getByText('target');
        const mask = getByText('mask');

        fireEvent.mouseOver(target);
        expect(isHovered).toBe(true);

        fireEvent.mouseOut(mask);
        expect(isHovered).toBe(false);

        fireEvent.mouseEnter(target);
        expect(isHovered).toBe(true);
    });

    it('should not work if disabled', () => {
        let isHovered: Nullable<boolean> = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isHovered = useIsHovered(ref, undefined, false);
            return <div ref={ref}>target</div>;
        }

        expect(isHovered).toBeNull();
        const { getByText } = render(<TestComponent />);
        expect(isHovered).toBe(false);

        const target = getByText('target');

        fireEvent.mouseOver(target);
        expect(isHovered).toBe(false);

        fireEvent.mouseOut(target);
        expect(isHovered).toBe(false);

        fireEvent.mouseEnter(target);
        expect(isHovered).toBe(false);
    });
});
