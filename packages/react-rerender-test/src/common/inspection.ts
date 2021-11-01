export type IInspectionNodeChildren = Record<number, IInspectionNode>;

export interface IInspectionRecord {
    index: number;
    key: Optional<string>;
    name: string;
}

export interface IInspectionNode extends IInspectionRecord {
    children?: IInspectionNodeChildren;
}

export interface IInspectedTree {
    name: string;
    children?: IInspectionNodeChildren;
}

export const inspectorName = 'Inspector';
