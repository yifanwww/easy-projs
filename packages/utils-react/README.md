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

## Develop this package

You need to build package `@easy/scripts` before building or testing this package.

### Build this package

Execute `npm run build` or `yarn build` to build this package.

### Do coverage test

- Execute `npm run test` or `yarn test` to watch test.
- Execute `npm run test-coverage` or `yarn test-coverage` to do coverage test.
