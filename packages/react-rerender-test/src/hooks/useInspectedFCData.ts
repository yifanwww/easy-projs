import { useRef } from 'react';

import { InspectionData, InspectedFC } from 'src/common/inspection';
import { inspectorName } from 'src/components/Inspector';
import { getElementOwner } from 'src/utils/getElementOwner';

export function useInspectedFCData(): InspectionData {
    const ref = useRef<InspectionData>();

    if (ref.current === undefined) {
        const owner = getElementOwner();
        let fc = owner.type as InspectedFC;

        const record: InspectionData = {
            index: owner.index,
            key: owner.key,
            name: fc.inspected ?? fc.displayName ?? fc.name,
            parents: [],
        };

        // Find all inspected parents.
        for (let node = owner.return; node !== null; node = node.return) {
            const { type } = node;

            if (typeof type === 'function') {
                fc = type as InspectedFC;
                if (fc.inspected) {
                    if (fc.inspected === inspectorName) {
                        // All inspected components should be placed in `Inspector`.
                        // So here we find `Inspector`, then we can break loop.
                        break;
                    }

                    record.parents.push({
                        index: node.index,
                        // key: node.key,
                        // name: fc.inspected,
                    });
                }
            }
        }

        record.parents.reverse();
        ref.current = record;
    }

    return ref.current;
}
