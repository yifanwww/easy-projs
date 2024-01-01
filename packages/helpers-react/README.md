# @easy-pkg/helpers-react

A package that contains React helpers.

## Usage
### `renderFactory` && `defaultOnRender`

```tsx
import { defaultOnRender, renderFactory, RenderFn } from '@easy-pkg/helpers-react';

interface PageHeaderProps {
    title: string;
}

export function PageHeader({ title }: PageHeaderProps): React.ReactNode {
    return (
        <div>
            {title}
            {/* ... */}
        </div>
    );
}

const renderHeader = renderFactory(PageHeader);

interface PageProps {
    onRenderHeader?: RenderFn<PageHeaderProps>;
    title: string;
}

export function Page(props: PageProps): React.ReactNode {
    const { onRenderHeader = defaultOnRender, title } = props;

    return (
        <div>
            {onRenderHeader({ title }, renderHeader)}
            {/* ... */}
        </div>
    );
}
```

### Build this package

Execute `pnpm run build` to build this package.

### Do coverage test

- Execute `pnpm run test` to watch test.
- Execute `pnpm run test-full` to do full coverage test.
