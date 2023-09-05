import type { InspectionData, InspectionTree } from 'src/types/inspection';

export interface InspectionContextState {
    data: Record<
        string,
        {
            records: InspectionData[];
            tree: InspectionTree;
        }
    >;
    groups: string[];
    selectedGroup?: string;
}

export interface InspectionContextUpdaters {
    addRecord: (record: InspectionData, groupIndex: number) => void;
    forceUpdate: () => void;
    registerGroup: (group: string, index: number) => void;
    toggleGroup: (toggle: 'prev' | 'next') => void;
}
