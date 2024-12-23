import { describe, expect, it } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { useRef } from 'react';

import { useIsFocused } from '../useIsFocused.js';

describe(`Test react hook \`${useIsFocused.name}\``, () => {
    it('should return whether the component is focused', () => {
        let isFocused: boolean | null = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isFocused = useIsFocused(ref);
            return <div ref={ref}>Test-Component</div>;
        }

        expect(isFocused).toBeNull();
        const { getByText } = render(<TestComponent />);
        expect(isFocused).toBe(false);

        const component = getByText('Test-Component');

        fireEvent.focus(component);
        expect(isFocused).toBe(true);

        fireEvent.focusOut(component);
        expect(isFocused).toBe(false);

        fireEvent.focusIn(component);
        expect(isFocused).toBe(true);
    });

    it('should not work if disabled', () => {
        let isFocused: boolean | null = null;
        function TestComponent() {
            const ref = useRef<HTMLDivElement>(null);
            isFocused = useIsFocused(ref, false);
            return <div ref={ref}>Test-Component</div>;
        }

        expect(isFocused).toBeNull();
        const { getByText } = render(<TestComponent />);
        expect(isFocused).toBe(false);

        const component = getByText('Test-Component');

        fireEvent.focus(component);
        expect(isFocused).toBe(false);

        fireEvent.focusOut(component);
        expect(isFocused).toBe(false);

        fireEvent.focusIn(component);
        expect(isFocused).toBe(false);
    });
});
