import { useContext, useRef } from 'react';

import { IInspectionRecord, inspectorName } from 'src/common/inspection';
import { InspectionContextUpdater } from 'src/contexts/InspectionContext';
import { useFnCallInStrictMode } from 'src/hooks/useFnCallInStrictMode';

import { ComponentView, IComponentViewProps } from '../ComponentView';
import { Fiber } from '../utils/fiber';

type InspectedFC<P = {}> = React.FC<P> & { inspected?: string };

// @ts-ignore
const getOwner = () => (<div />)._owner as Fiber;

function useInspectedParents(): IInspectionRecord[] {
    const ref = useRef<IInspectionRecord[]>();

    if (ref.current === undefined) {
        ref.current = [];

        const owner = getOwner();

        let node = owner.return;
        while (node !== null) {
            const type = node.elementType ?? node.type;

            if (typeof type === 'function') {
                const fc = type as InspectedFC;
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

function useCurrentInpectedData(): IInspectionRecord {
    const ref = useRef<IInspectionRecord>();

    if (ref.current === undefined) {
        const owner = getOwner();
        const fc = owner.elementType as InspectedFC;

        ref.current = {
            index: owner.index,
            key: owner.key,
            name: fc.displayName ?? fc.inspected!,
        };
    }

    return ref.current;
}

export function createInspectedFC<P = {}>(fc: React.FC<P>, viewProps: IComponentViewProps): React.FC<P> {
    const _fc: InspectedFC<P> = (props) => {
        const { addRecord } = useContext(InspectionContextUpdater);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const parents = useInspectedParents();
        const data = useCurrentInpectedData();

        useFnCallInStrictMode(() => addRecord(data));

        return <ComponentView {...viewProps}>{fc(props)}</ComponentView>;
    };
    _fc.displayName = viewProps.name;
    _fc.inspected = viewProps.name;

    return _fc;
}
