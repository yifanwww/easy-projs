import type { InspectionData, InspectionTree } from 'src/common/inspection';

export interface IInspectionContextState {
    data: {
        [Group: string]: {
            records: InspectionData[];
            tree: InspectionTree;
        };
    };
    groups: string[];
    selectedGroup: Optional<string>;
}

export interface IInspectionContextUpdaters {
    addRecord: (record: InspectionData, groupIndex: number) => void;
    forceUpdate: () => void;
    registerGroup: (group: string, index: number) => void;
    toggleGroup: (toggle: 'prev' | 'next') => void;
}
