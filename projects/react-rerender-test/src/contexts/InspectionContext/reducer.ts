import type { ImmerReducer } from '@easy-pkg/utils-react';
import produce from 'immer';

import type { InspectionData } from 'src/common/inspection';

import type { InspectionContextState } from './types';

export type ReducerAction =
    | { type: 'add-record'; groupIndex: number; record: InspectionData }
    | { type: 'register-group'; index: number; group: string }
    | { type: 'toggle-group'; toggle: 'prev' | 'next' };

export const reduce = produce<ImmerReducer<InspectionContextState, ReducerAction>>((state, action) => {
    let never: never;
    switch (action.type) {
        case 'add-record': {
            const { groupIndex, record } = action;
            const { data, groups } = state;

            data[groups[groupIndex]].records.push(record);

            break;
        }

        case 'register-group': {
            const { group, index } = action;
            const { data, groups } = state;

            if (data[group] === undefined) {
                groups.push(group);
                data[group] = {
                    records: [],
                    tree: { group, index, children: [] },
                };
            }

            if (groups.length > 0 && state.selectedGroup === null) {
                state.selectedGroup = groups[0];
            }

            break;
        }

        case 'toggle-group': {
            const { toggle } = action;
            const { groups } = state;

            if (!state.selectedGroup) break;

            const index = groups.indexOf(state.selectedGroup);
            if (toggle === 'next') {
                state.selectedGroup = groups[(index + 1) % groups.length];
            } else {
                state.selectedGroup = groups[(index + groups.length - 1) % groups.length];
            }

            break;
        }

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }
});
