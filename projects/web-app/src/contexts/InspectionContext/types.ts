import type { InspectionData, InspectionTree } from 'src/types/inspection';

export interface InspectionContextValue {
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

export interface InspectionUpdaterContextValue {
    addRecord: (record: InspectionData, groupIndex: number) => void;
    forceUpdate: () => void;
    registerGroup: (group: string, index: number) => void;
    toggleGroup: (toggle: 'prev' | 'next') => void;
}
