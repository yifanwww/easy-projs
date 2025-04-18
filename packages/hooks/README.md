# @easy-pkg/hooks

Some useful React hooks.

Consider open-source React hooks library first:
- [`react-use`](https://github.com/streamich/react-use).
- [`use-callback-ref`](https://github.com/theKashey/use-callback-ref)

## Usage

It's very easy to use these custom React hooks.

Here is an example about how to use hook `useIsHovered`.

```tsx
import { useIsHovered } from '@easy-pkg/hooks';

export function Component(): React.ReactNode {
    const ref = useRef<SubComponent>(null);

    const isHovered = useIsHovered(ref);

    return <SubComponent className={isHovered ? 'sub-component-hover' : 'sub-component'} ref={ref} />;
}
```

### Build this package

Execute `pnpm run build` to build this package.

### Do coverage test

- Execute `pnpm run test` to watch test.
- Execute `pnpm run test-full` to do full coverage test.
