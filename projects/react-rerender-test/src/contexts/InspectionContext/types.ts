import type { Optional } from '@easy-pkg/utils-type';

import type { InspectionData, InspectionTree } from 'src/common/inspection';

export interface InspectionContextState {
    data: {
        [Group: string]: {
            records: InspectionData[];
            tree: InspectionTree;
        };
    };
    groups: string[];
    selectedGroup: Optional<string>;
}

export interface InspectionContextUpdaters {
    addRecord: (record: InspectionData, groupIndex: number) => void;
    forceUpdate: () => void;
    registerGroup: (group: string, index: number) => void;
    toggleGroup: (toggle: 'prev' | 'next') => void;
}
