import { expectElementSnapshot } from '@easy-pkg/utils-test';
import { render } from '@testing-library/react';

import { Introduction } from './Introduction';

describe(`Test component \`${Introduction.name}\``, () => {
    it('should render', () => {
        const reactElement = <Introduction />;

        expectElementSnapshot(reactElement);

        const { getByText } = render(reactElement);
        const linkElement = getByText(/Learn easy-projs/i);
        expect(linkElement).toBeInTheDocument();
    });
});
