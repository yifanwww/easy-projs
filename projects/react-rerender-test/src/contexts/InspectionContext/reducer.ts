import produce from 'immer';
import type { ImmerReducer } from 'use-immer';

import type { InspectionData } from 'src/common/inspection';

import type { InspectionContextState } from './types';

export type ReducerAction =
    | { type: 'add-record'; groupIndex: number; record: InspectionData }
    | { type: 'register-group'; index: number; group: string }
    | { type: 'toggle-group'; toggle: 'prev' | 'next' };

export const reduce = produce<ImmerReducer<InspectionContextState, ReducerAction>>((draft, action) => {
    let never: never;
    switch (action.type) {
        case 'add-record': {
            const { groupIndex, record } = action;
            const { data, groups } = draft;

            data[groups[groupIndex]].records.push(record);

            break;
        }

        case 'register-group': {
            const { group, index } = action;
            const { data, groups } = draft;

            if (data[group] === undefined) {
                groups.push(group);
                data[group] = {
                    records: [],
                    tree: { group, index, children: [] },
                };
            }

            if (groups.length > 0 && draft.selectedGroup === null) {
                draft.selectedGroup = groups[0];
            }

            break;
        }

        case 'toggle-group': {
            const { toggle } = action;
            const { groups } = draft;

            if (!draft.selectedGroup) break;

            const index = groups.indexOf(draft.selectedGroup);
            if (toggle === 'next') {
                draft.selectedGroup = groups[(index + 1) % groups.length];
            } else {
                draft.selectedGroup = groups[(index + groups.length - 1) % groups.length];
            }

            break;
        }

        /* istanbul ignore next */
        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = action;
    }
});
