import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';
import { useWhyDidYouUpdate } from '../useWhyDidYouUpdate.js';

function mockConsoleToMatchSnapshot() {
  jest
    .spyOn(console, 'debug')
    .mockImplementation((...messages) => expect({ console: 'debug', messages }).toMatchSnapshot());
  jest
    .spyOn(console, 'error')
    .mockImplementation((...messages) => expect({ console: 'error', messages }).toMatchSnapshot());
  jest
    .spyOn(console, 'info')
    .mockImplementation((...messages) => expect({ console: 'info', messages }).toMatchSnapshot());
  jest
    .spyOn(console, 'log')
    .mockImplementation((...messages) => expect({ console: 'log', messages }).toMatchSnapshot());
  jest
    .spyOn(console, 'warn')
    .mockImplementation((...messages) => expect({ console: 'warn', messages }).toMatchSnapshot());
}

beforeEach(() => {
  mockConsoleToMatchSnapshot();
});

describe(`Test react hook \`${useWhyDidYouUpdate.name}\``, () => {
  it('should work with simple props', () => {
    interface Props {
      fontSize: number | string;
      title: string;
    }

    function TestComponent(props: Props) {
      useWhyDidYouUpdate(TestComponent.name, props);
      return <div />;
    }

    expect(() => {
      const { rerender } = render(<TestComponent fontSize="20px" title="title" />);
      rerender(<TestComponent fontSize={20} title="title" />);
      rerender(<TestComponent fontSize={20} title="new-title" />);
      rerender(<TestComponent fontSize="28px" title="new-title" />);
    }).not.toThrow();
  });

  it('should work with complex props', () => {
    interface Props {
      color: string;
      style?: React.CSSProperties;
      title: string;
    }

    function TestComponent(props: Props) {
      useWhyDidYouUpdate(TestComponent.name, props);
      return <div />;
    }

    expect(() => {
      const { rerender } = render(<TestComponent color="red" title="title" />);
      rerender(<TestComponent color="red" title="title" style={{ fontSize: '28px' }} />);
      rerender(<TestComponent color="red" title="new-title" style={{ fontSize: '28px', margin: '8px 0px' }} />);
      rerender(<TestComponent color="green" title="new-title" style={{ fontSize: '28px', margin: '8px 0px' }} />);
    }).not.toThrow();
  });
});
