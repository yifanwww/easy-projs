import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Introduction } from './Introduction';

describe(`Test component \`${Introduction.name}\``, () => {
    it('should render', () => {
        const element = <Introduction />;

        expect(renderer.create(element).toJSON()).toMatchSnapshot();

        const { getByText } = render(element);
        const textElement = getByText(/Learn easy-projs/i);
        expect(textElement).toBeInTheDocument();
    });
});
