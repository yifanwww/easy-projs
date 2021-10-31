import { useRef } from 'react';

import { IInspectedNode } from 'src/common/inspect';

import { ComponentView, IComponentViewProps } from '../ComponentView';
import { Fiber } from '../utils/fiber';
import { inspectorDisplayName } from './Inspector';

type InspectedFC<P = {}> = React.FC<P> & { inspected?: string };

function useInspectedParents(): IInspectedNode[] {
    const ref = useRef<IInspectedNode[]>();

    if (ref.current === undefined) {
        ref.current = [];

        // @ts-ignore
        const owner: Fiber = (<div />)._owner;

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
                } else if (fc.displayName === inspectorDisplayName) {
                    ref.current.push({
                        index: node.index,
                        key: node.key,
                        name: inspectorDisplayName,
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
        const parents = useInspectedParents();

        console.log(viewProps.name, parents);

        return <ComponentView {...viewProps}>{fc(props)}</ComponentView>;
    };
    _fc.displayName = viewProps.name;
    _fc.inspected = viewProps.name;

    return _fc;
}
