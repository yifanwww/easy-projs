# @easy/utils-react

A package that contains React utilities.

## Usage
### `renderFactory` && `defaultOnRender`

```tsx
import { defaultOnRender, renderFactory, RenderFn } from '@easy/utils-react';

export interface PageHeaderProps {
    title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => (
    <div>
        {title}
        {/* ... */}
    </div>
);

const renderHeader = renderFactory(PageHeader);

export interface PageProps {
    onRenderHeader?: RenderFn<PageHeaderProps>;
    title: string;
}

export const Page: React.FC<PageProps> = (props) => {
    const { onRenderHeader = defaultOnRender, title } = props;

    return (
        <div>
            {onRenderHeader({ title }, renderHeader)}
            {/* ... */}
        </div>
    );
}
```

### `useImmerReducer`

```tsx
import { ImmerReducer, useImmerReducer } from '@easy/utils-react';

type EasyContext = { value1: number; value2: string };
type EasyAction = { type: 'value1' } | { type: 'value2'; payload: string };

const reducer: ImmerReducer<EasyContext, EasyAction> = (state, action) => {
    let never: never;
    switch (action.type) {
        case 'value1':
            state.value1++;
            break;

        case 'value2':
            state.value2 = action.payload;
            break;

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }
};

export const Component: React.FC = () => {
    const [context, dispatch] = useImmerReducer(reducer, { value1: 0, value2: '' });

    // do something

    return /* something */;
}
```

## Develop this package

You need to build package `@easy-config/scripts` before building or testing this package.

### Build this package

Execute `pnpm run build` to build this package.

### Do coverage test

- Execute `pnpm run test` to watch test.
- Execute `pnpm run test-full` to do full coverage test.
