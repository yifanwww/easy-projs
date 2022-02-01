# @easy/utils-react

A package that contains React utilities.

## Usage
### `renderFactory` && `defaultOnRender`

```tsx
import { defaultOnRender, renderFactory, RenderFn } from '@easy/utils-react';

export interface PageHeaderProps {
    title: string;
}

export const PageHeader: React.VFC<PageHeaderProps> = ({ title }) => (
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

export const Page: React.VFC<PageProps> = (props) => {
    const { onRenderHeader = defaultOnRender, title } = props;

    return (
        <div>
            {onRenderHeader({ title }, renderHeader)}
            {/* ... */}
        </div>
    );
}
```

### `ReactImmerReducer`

```tsx
import { ReactImmerReducer } from '@easy/utils-react';
import { useImmerReducer } from 'use-immer';

type EasyContext = { value1: number; value2: string };
type EasyAction = { type: 'value1' } | { type: 'value2'; payload: string };

const reducer: ReactImmerReducer<EasyContext, EasyAction> = (state, action) => {
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

export const Component: React.VFC = () => {
    const [context, dispatch] = useImmerReducer(reducer, { value1: 0, value2: '' });

    // do something

    return /* something */;
}
```

## Develop this package

You need to build package `@easy/scripts` before building or testing this package.

### Build this package

Execute `npm run build` or `yarn build` to build this package.

### Do coverage test

- Execute `npm run test` or `yarn test` to watch test.
- Execute `npm run test-full` or `yarn test-full` to do full coverage test.
