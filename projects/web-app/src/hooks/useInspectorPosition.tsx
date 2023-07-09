import { useRef } from 'react';

import { inspectorName } from 'src/components/Inspector';
import type { InspectedFC } from 'src/types/inspection';
import { getElementOwner } from 'src/utils/getElementOwner';

export function useInspectorPosition(): number {
    const ref = useRef<number>();

    if (ref.current === undefined) {
        const owner = getElementOwner();

        if (typeof owner.type === 'function' && (owner.type as InspectedFC).inspected === inspectorName) {
            ref.current = owner.index;
        } else {
            // Find parent `Inspector`.
            for (let node = owner.return; node !== null; node = node.return) {
                const { type } = node;

                if (typeof type === 'function' && (type as InspectedFC).inspected === inspectorName) {
                    ref.current = node.index;
                    break;
                }
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return ref.current!;
}
