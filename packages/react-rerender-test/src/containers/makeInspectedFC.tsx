import { useContext, useEffect } from 'react';

import { InspectedFC, InspectedFCType } from 'src/common/inspection';
import { ComponentView } from 'src/components/ComponentView';
import { InspectionContextUpdater } from 'src/contexts/InspectionContext';
import { useInpectedComponentData } from 'src/hooks/useInpectedComponentData';
import { useInspectedFCType } from 'src/hooks/useInspectedFCType';

const colors = [
    '#fff0f6',
    '#fff1f0',
    '#fff2e8',
    '#fff7e6',
    '#fffbe6',
    '#fcffe6',
    '#f6ffed',
    '#e6fffb',
    '#e6f7ff',
    '#f0f5ff',
    '#f9f0ff',
];

export interface IInspectedOptions {
    /**
     * Background color.
     */
    color?: string;
    desc?: string;
    name: string;
    /**
     * The type of inspected function component.
     * It can be automatically detected, but may be wrong is some special situation (such as `Route`).
     */
    type?: InspectedFCType;
}

export function makeInspectedFC(name: string): <P = {}>(fc?: React.FC<P>) => InspectedFC<P>;
export function makeInspectedFC(options: IInspectedOptions): <P = {}>(fc?: React.FC<P>) => InspectedFC<P>;

export function makeInspectedFC(options: string | IInspectedOptions) {
    const _options = typeof options === 'string' ? { name: options } : options;
    const { color, desc, name, type } = _options;

    return function wrapFC<P = {}>(fc?: React.FC<P>) {
        const _fc: React.FC<P> = fc ?? ((props) => <>{props.children}</>);

        const _inspectedFC: InspectedFC<P> = (props) => {
            const { addRecord, forceUpdate } = useContext(InspectionContextUpdater);

            const data = useInpectedComponentData();
            const level = data.parents.length - 1;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const _type = type ?? useInspectedFCType(_fc, props);

            addRecord(data);

            useEffect(() => {
                forceUpdate();
            });

            return (
                <ComponentView color={color ?? colors[level]} desc={desc} name={name} type={_type}>
                    {_fc(props)}
                </ComponentView>
            );
        };
        _inspectedFC.displayName = name;
        _inspectedFC.inspected = name;

        return _inspectedFC;
    };
}
