import { useContext, useRef } from 'react';

import { ComponentView, IComponentViewProps } from 'src/components/ComponentView';
import { Fiber } from 'src/utils/fiber';
import { IInspectionRecord, InspectionContextUpdater, inspectorName } from 'src/utils/inspection';

type InspectedFC<P = {}> = React.FC<P> & { inspected?: string };

// @ts-ignore
const getOwner = () => (<div />)._owner as Fiber;

function useCurrentInpectedData(): IInspectionRecord[] {
    const ref = useRef<IInspectionRecord[]>();

    if (ref.current === undefined) {
        const owner = getOwner();
        let fc = owner.elementType as InspectedFC;

        ref.current = [
            {
                index: owner.index,
                key: owner.key,
                name: fc.displayName ?? fc.inspected!,
            },
        ];

        // Find all inspected parents.
        let node = owner.return;
        while (node !== null) {
            const type = node.elementType ?? node.type;

            if (typeof type === 'function') {
                fc = type as InspectedFC;
                if (fc.inspected) {
                    ref.current.push({
                        index: node.index,
                        key: node.key,
                        name: fc.displayName ?? fc.inspected,
                    });
                } else if (fc.displayName === inspectorName) {
                    ref.current.push({
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

        ref.current.reverse();
    }

    return ref.current;
}

export function createInspectedFC<P = {}>(fc: React.FC<P>, viewProps: IComponentViewProps): React.FC<P> {
    const _fc: InspectedFC<P> = (props) => {
        const { addRecord } = useContext(InspectionContextUpdater);

        const data = useCurrentInpectedData();

        addRecord(data[data.length - 1]);

        return <ComponentView {...viewProps}>{fc(props)}</ComponentView>;
    };
    _fc.displayName = viewProps.name;
    _fc.inspected = viewProps.name;

    return _fc;
}
