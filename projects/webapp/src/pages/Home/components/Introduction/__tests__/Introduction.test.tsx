import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { Introduction } from '../Introduction';

describe(`Test component \`${Introduction.name}\``, () => {
    function Wrapper({ children }: React.PropsWithChildren) {
        return (
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={children} />
                </Routes>
            </MemoryRouter>
        );
    }

    it('should render', () => {
        const { asFragment, getByText } = render(<Introduction />, { wrapper: Wrapper });
        expect(asFragment()).toMatchSnapshot();
        const linkElement = getByText(/Learn easy-projs/i);
        expect(linkElement).toBeInTheDocument();
    });
});
