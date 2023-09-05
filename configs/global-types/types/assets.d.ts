/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.avif' {
    const src: string;
    export default src;
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

    const src: string;
    export default src;
}

declare module '*.module.css' {
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    const classes: { readonly [key: string]: string };
    export default classes;
}
