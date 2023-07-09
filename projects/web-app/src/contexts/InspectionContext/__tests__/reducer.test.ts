import type { InspectionData } from 'src/types/inspection';

import { getInitialState } from '../context';
import { reduce } from '../reducer';

describe(`Test reducer fn \`${reduce.name}\``, () => {
    const groups: { index: number; group: string }[] = [
        { index: 0, group: 'group0' },
        { index: 1, group: 'group1' },
        { index: 2, group: 'group2' },
        { index: 3, group: 'group3' },
        { index: 4, group: 'group4' },
    ];

    const records: { groupIndex: number; record: InspectionData }[] = [
        { groupIndex: 0, record: { index: 0, key: 'record0', name: 'record0', parents: [] } },
        { groupIndex: 1, record: { index: 1, key: 'record1', name: 'record1', parents: [] } },
        { groupIndex: 2, record: { index: 2, key: 'record2', name: 'record2', parents: [] } },
        { groupIndex: 2, record: { index: 3, key: 'record3', name: 'record3', parents: [] } },
    ];

    it('should register new group', () => {
        let state = getInitialState();
        for (const group of groups) {
            state = reduce(state, { type: 'register-group', index: group.index, group: group.group });
        }
        expect(state).toMatchSnapshot();
    });

    it('should add new record', () => {
        let state = getInitialState();

        for (const group of groups) {
            state = reduce(state, { type: 'register-group', index: group.index, group: group.group });
        }

        for (const record of records) {
            state = reduce(state, { type: 'add-record', groupIndex: record.groupIndex, record: record.record });
        }

        expect(state).toMatchSnapshot();
    });

    it('should toggle a group', () => {
        // TODO
    });
});
