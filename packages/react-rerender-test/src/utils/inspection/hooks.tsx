import { useRef } from 'react';
import { inspectorName } from './Inspector';

import { IInspectionData, InspectedFC } from './types';

// @ts-ignore
const getOwner = () => (<div />)._owner as Fiber;

export function useInpectedComponentData(): IInspectionData {
    const ref = useRef<IInspectionData>();

    if (ref.current === undefined) {
        const owner = getOwner();
        let fc = owner.elementType as InspectedFC;

        const record: IInspectionData = {
            index: owner.index,
            key: owner.key,
            name: fc.displayName ?? fc.inspected!,
            parents: [],
        };

        // Find all inspected parents.
        let node = owner.return;
        while (node !== null) {
            const type = node.elementType ?? node.type;

            if (typeof type === 'function') {
                fc = type as InspectedFC;
                if (fc.inspected) {
                    record.parents.push({
                        index: node.index,
                        key: node.key,
                        name: fc.displayName ?? fc.inspected,
                    });
                } else if (fc.displayName === inspectorName) {
                    record.parents.push({
                        index: node.index,
                        key: node.key,
                        name: inspectorName,
                    });

                    // All inspected components should be placed in `Inspector`.
                    // So here we find `Inspector`, then we can break loop.
                    break;
                }
            }

            node = node.return;
        }
        record.parents.reverse();

        ref.current = record;
    }

    return ref.current;
}
