import { mockConsoleToMatchSnapshot } from '@easy/utils-test';
import { render } from '@testing-library/react';

import { useWhyDidYouUpdate } from '../useWhyDidYouUpdate';

beforeEach(() => {
    mockConsoleToMatchSnapshot();
});

describe(`Test react hook \`${useWhyDidYouUpdate.name}\``, () => {
    it('works with simple props', () => {
        interface Props {
            fontSize: number | string;
            title: string;
        }

        function TestComponent(props: Props) {
            useWhyDidYouUpdate(TestComponent.name, props);
            return <div />;
        }

        const { rerender } = render(<TestComponent fontSize="20px" title="title" />);
        rerender(<TestComponent fontSize={20} title="title" />);
        rerender(<TestComponent fontSize={20} title="new-title" />);
        rerender(<TestComponent fontSize="28px" title="new-title" />);
    });

    it('works with complex props', () => {
        interface Props {
            color: string;
            style?: React.CSSProperties;
            title: string;
        }

        function TestComponent(props: Props) {
            useWhyDidYouUpdate(TestComponent.name, props);
            return <div />;
        }

        const { rerender } = render(<TestComponent color="red" title="title" />);
        rerender(<TestComponent color="red" title="title" style={{ fontSize: '28px' }} />);
        rerender(<TestComponent color="red" title="new-title" style={{ fontSize: '28px', margin: '8px 0px' }} />);
        rerender(<TestComponent color="green" title="new-title" style={{ fontSize: '28px', margin: '8px 0px' }} />);
    });
});
