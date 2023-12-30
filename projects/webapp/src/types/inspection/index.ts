import type { Nullable } from '@easy-pkg/types/utils';

export interface InspectionNode {
    index: number;
    children?: InspectionNode[];
    key: Nullable<string>;
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
    // key: Nullable<string>;
    // name: string;
}

export interface InspectionData {
    index: number;
    key: Nullable<string>;
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
