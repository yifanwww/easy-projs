import { useRef } from 'react';

import { IInspectionData, InspectedFC } from 'src/common/inspection';
import { inspectorName } from 'src/components/Inspector';
import { getElementOwner } from 'src/utils/getElementOwner';

export function useInpectedComponentData(): IInspectionData {
    const ref = useRef<IInspectionData>();

    if (ref.current === undefined) {
        const owner = getElementOwner();
        let fc = owner.type as InspectedFC;

        const record: IInspectionData = {
            index: owner.index,
            key: owner.key,
            name: fc.inspected ?? fc.displayName ?? fc.name,
            parents: [],
        };

        // Find all inspected parents.
        let node = owner.return;
        while (node !== null) {
            const { type } = node;

            if (typeof type === 'function') {
                fc = type as InspectedFC;
                if (fc.inspected) {
                    record.parents.push({
                        index: node.index,
                        key: node.key,
                        name: fc.inspected,
                    });

                    if (fc.displayName === inspectorName) {
                        // All inspected components should be placed in `Inspector`.
                        // So here we find `Inspector`, then we can break loop.
                        break;
                    }
                }
            }

            node = node.return;
        }
        record.parents.reverse();

        ref.current = record;
    }

    return ref.current;
}
