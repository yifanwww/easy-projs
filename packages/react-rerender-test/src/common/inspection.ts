export type IInspectionNodeChildren = Record<number, IInspectionNode>;

export interface IInspectionNode {
    index: number;
    children?: IInspectionNodeChildren;
    key: Optional<string>;
    name: string;
}

export interface IInspectionTree {
    name: string;
    children?: IInspectionNodeChildren;
}

export interface IInspectionParent {
    index: number;
    key: Optional<string>;
    name: string;
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
    group: (groupName: string) => this;
    type: (type: InspectedFCType) => this;
}
