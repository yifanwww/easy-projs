import type { ReactChildrenProps } from '@easy-pkg/helpers-react';
import type { Optional } from '@easy-pkg/types/utils';
import { useRef } from 'react';
import type { ReadonlyArrayOrSingle } from 'ts-essentials';

import type { InspectedFC, InspectedFCType } from 'src/types/inspection';
import { withMockedHooks } from 'src/utils/withMockedHooks';

const inspectionTestName = 'InspectionTest';

const InspectionTest: InspectedFC = (props) => <>{props.children}</>;
InspectionTest.displayName = inspectionTestName;
InspectionTest.inspected = inspectionTestName;

type StackItem = Optional<React.ReactElement>;

/**
 * See how ReactElement is generated:
 * https://github.com/facebook/react/blob/v17.0.2/packages/react/src/ReactElement.js#L348
 */
function dfs(element: React.ReactElement): InspectedFCType {
    const stack: StackItem[] = [element];

    let res: InspectedFCType = 'nil';

    while (stack.length > 0) {
        const item = stack.pop();

        if (item === undefined) continue;

        const { type } = item;
        const children = (item.props as ReactChildrenProps).children as ReadonlyArrayOrSingle<React.ReactElement>;

        if (typeof type === 'function') {
            const fc = type as InspectedFC;
            if (fc.inspected) {
                if (fc.inspected === inspectionTestName) {
                    res = 'ptc';
                    break;
                } else {
                    res = 'prc';
                }
            }
        }

        if (children) {
            if (Array.isArray(children)) {
                stack.push(...children);
            } else {
                stack.push(children);
            }
        }
    }

    return res;
}

export function useInspectedFCType<P = NonNullable<unknown>>(
    fc: React.FC<React.PropsWithChildren<P>>,
    props: React.PropsWithChildren<P>,
): InspectedFCType {
    const ref = useRef<InspectedFCType>();

    if (ref.current === undefined) {
        const element = withMockedHooks(fc)({ ...props, children: <InspectionTest /> });
        if (typeof element !== 'object' || element === null) {
            ref.current = 'nil';
        } else {
            ref.current = dfs(element as React.ReactElement);
        }
    }

    return ref.current;
}
