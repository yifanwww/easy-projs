import type { Optional } from '@easy-pkg/utils-type';

export interface InspectionNode {
    index: number;
    children?: InspectionNode[];
    key: Optional<string>;
    name: string;
}

export interface InspectionTree {
    group: string;
    index: number;
    // name: string;
    children?: InspectionNode[];
}

export interface InspectionParent {
    index: number;
    // key: Optional<string>;
    // name: string;
}

export interface InspectionData {
    index: number;
    key: Optional<string>;
    name: string;
    parents: InspectionParent[];
}

export type InspectedFCType = 'nil' | 'prc' | 'ptc';

export interface InspectedFC<P = NonNullable<unknown>> extends React.FC<React.PropsWithChildren<P>> {
    inspected?: string;
}

export interface InspectedFCMaker<P = NonNullable<unknown>> extends InspectedFC<P> {
    color: (color: string) => this;
    desc: (desc: string) => this;
    type: (type: InspectedFCType) => this;
}
