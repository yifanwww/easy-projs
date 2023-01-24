# @easy-pkg/utils-react

A package that contains React utilities.

## Usage
### `renderFactory` && `defaultOnRender`

```tsx
import { defaultOnRender, renderFactory, RenderFn } from '@easy-pkg/utils-react';

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

## Develop this package

You need to build package `@easy-config/scripts` before building or testing this package.

### Build this package

Execute `pnpm run build` to build this package.

### Do coverage test

- Execute `pnpm run test` to watch test.
- Execute `pnpm run test-full` to do full coverage test.
