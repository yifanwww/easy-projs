import { useContext, useRef } from 'react';

import { ComponentView, IComponentViewProps } from 'src/components/ComponentView';

import { InspectionContextUpdater } from './InspectionContext';
import { inspectorName } from './Inspector';
import { IInspectionRecord } from './types';

type InspectedFC<P = {}> = React.FC<P> & { inspected?: string };

// @ts-ignore
const getOwner = () => (<div />)._owner as Fiber;

function useCurrentInpectedData(): IInspectionRecord {
    const ref = useRef<IInspectionRecord>();

    if (ref.current === undefined) {
        const owner = getOwner();
        let fc = owner.elementType as InspectedFC;

        const record: IInspectionRecord = {
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

export function createInspectedFC<P = {}>(fc: React.FC<P>, viewProps: IComponentViewProps): React.FC<P> {
    const _fc: InspectedFC<P> = (props) => {
        const { addRecord } = useContext(InspectionContextUpdater);

        const data = useCurrentInpectedData();

        addRecord(data);

        return <ComponentView {...viewProps}>{fc(props)}</ComponentView>;
    };
    _fc.displayName = viewProps.name;
    _fc.inspected = viewProps.name;

    return _fc;
}
