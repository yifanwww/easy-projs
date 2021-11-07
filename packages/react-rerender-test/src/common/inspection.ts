export interface IInspectionNode {
    index: number;
    children?: IInspectionNode[];
    key: Optional<string>;
    name: string;
}

export interface IInspectionTree {
    group: string;
    index: number;
    // name: string;
    children?: IInspectionNode[];
}

export interface IInspectionParent {
    index: number;
    // key: Optional<string>;
    // name: string;
}

export interface IInspectionData {
    index: number;
    key: Optional<string>;
    name: string;
    parents: IInspectionParent[];
}

export type InspectedFCType = 'nil' | 'prc' | 'ptc';

export interface InspectedFC<P = {}> extends React.FC<P> {
    inspected?: string;
}

export interface InspectedFCMaker<P = {}> extends InspectedFC<P> {
    color: (color: string) => this;
    desc: (desc: string) => this;
    type: (type: InspectedFCType) => this;
}
