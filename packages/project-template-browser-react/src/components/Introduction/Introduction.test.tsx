import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Introduction } from './Introduction';

describe('Test component `Introduction`', () => {
    it('renders', () => {
        const reactElement = <Introduction />;

        const component = renderer.create(reactElement);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const { getByText } = render(reactElement);
        const linkElement = getByText(new RegExp('Learn easy-projs', 'i'));
        expect(linkElement).toBeInTheDocument();
    });
});
