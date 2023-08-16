export type RenderFn<P> = (
    props: P,
    defaultRender: (props: P) => React.ReactElement | null,
) => React.ReactElement | null;

// HACK: Maybe it's a TypeScript bug, we shouldn't use `JSX.IntrinsicAttributes` here
// eslint-disable-next-line @typescript-eslint/naming-convention
export function renderFactory<P extends JSX.IntrinsicAttributes>(Component: React.FC<P>) {
    return (props: P) => <Component {...props} />;
}

export function defaultOnRender<P>(props: P, defaultRender: (props: P) => React.ReactElement | null) {
    return defaultRender(props);
}
