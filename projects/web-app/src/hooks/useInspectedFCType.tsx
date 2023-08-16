import type { ReactChildrenProps } from '@easy-pkg/helpers-react';
import type { LooseArray, Nullable } from '@easy-pkg/utils-type';
import { useRef } from 'react';

import type { InspectedFC, InspectedFCType } from 'src/types/inspection';
import { withMockedHooks } from 'src/utils/withMockedHooks';

const inspectionTestName = 'InspectionTest';

const InspectionTest: InspectedFC = (props) => <>{props.children}</>;
InspectionTest.displayName = inspectionTestName;
InspectionTest.inspected = inspectionTestName;

type StackItem = Nullable<React.ReactElement>;

/**
 * See how ReactElement is generated:
 * https://github.com/facebook/react/blob/v17.0.2/packages/react/src/ReactElement.js#L348
 */
function dfs(element: JSX.Element): InspectedFCType {
    const stack: StackItem[] = [element];

    let res: InspectedFCType = 'nil';

    while (stack.length > 0) {
        const item = stack.pop();

        if (item === null || item === undefined) continue;

        const { type } = item;
        const children = (item.props as ReactChildrenProps).children as LooseArray<React.ReactElement>;

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
        if (element === null || element === undefined) {
            ref.current = 'nil';
        } else {
            ref.current = dfs(element as JSX.Element);
        }
    }

    return ref.current;
}
