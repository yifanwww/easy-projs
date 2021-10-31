export type IInspectedNodeChildren = Record<number, IInspectedNode>;

export interface IInspectedNode {
    index: number;
    key: Optional<string>;
    name: string;
    children?: IInspectedNodeChildren;
}

export interface IInspectedTree {
    name: string;
    children?: IInspectedNodeChildren;
}
