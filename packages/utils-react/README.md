# @easy/utils-react

A package that contains React utilities.

## Usage
### `renderFactory` && `defaultOnRender`

```tsx
import { defaultOnRender, renderFactory, RenderFn } from '@easy/utils-react';

export interface IPageHeaderProps {
    title: string;
}

export const PageHeader = (props: IPageHeaderProps): React.ReactElement => (
    <div>
        {props.title}
        {/* ... */}
    </div>
);

const renderHeader = renderFactory(PageHeader);

export interface IPageProps {
    onRenderHeader?: RenderFn<IPageHeaderProps>;
    title: string;
}

export function Page(props: IPageProps): React.ReactElement {
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

type IEasyContext = { value1: number; value2: string };
type IEasyAction = { type: 'value1' } | { type: 'value2'; payload: string };

const reducer: ReactImmerReducer<IEasyContext, IEasyAction> = (state, action) => {
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

export function Component(): React.ReactElement {
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
- Execute `npm run test-coverage` or `yarn test-coverage` to do coverage test.
