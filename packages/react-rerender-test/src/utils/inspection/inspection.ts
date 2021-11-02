export type IInspectionNodeChildren = Record<number, IInspectionTreeNode>;

export interface IInspectionTreeNode {
    index: number;
    children?: IInspectionNodeChildren;
    key: Optional<string>;
    name: string;
}

export interface IInspectionTree {
    name: string;
    children?: IInspectionNodeChildren;
}

export const inspectorName = 'Inspector';

export interface IInspectionRecord {
    index: number;
    key: Optional<string>;
    name: string;
}
