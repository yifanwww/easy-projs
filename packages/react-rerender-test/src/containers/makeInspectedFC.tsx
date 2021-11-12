import { usePersistFn } from '@easy/hooks';
import { useContext, useEffect } from 'react';

import { InspectedFCMaker, InspectedFCType } from 'src/common/inspection';
import { ComponentView } from 'src/components/ComponentView';
import { InspectionContextUpdater } from 'src/contexts/InspectionContext';
import { useInspectedFCData } from 'src/hooks/useInspectedFCData';
import { useInspectedFCType } from 'src/hooks/useInspectedFCType';
import { useInspectorPosition } from 'src/hooks/useInspectorPosition';

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

interface _InspectedFCMaker<P = {}> extends InspectedFCMaker<P> {
    _inspectedColor?: string;
    _inspectedDesc?: string;
    _inspectedType?: InspectedFCType;
}

/**
 * @param name The name of this function component.
 * @param fc The function component itself, default is `(props) => <>{props.children}</>`.
 */
export function makeInspectedFC<P = {}>(name: string, fc?: React.FC<P>): InspectedFCMaker<P> {
    const _fc: React.FC<P> = fc ?? ((props) => <>{props.children}</>);

    const _inspectedFC: _InspectedFCMaker<P> = (props) => {
        const { _inspectedColor, _inspectedDesc, _inspectedType } = _inspectedFC;

        const { addRecord, forceUpdate } = useContext(InspectionContextUpdater);

        const data = useInspectedFCData();
        const level = data.parents.length;

        const groupIndex = useInspectorPosition();

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const _type = _inspectedType ?? useInspectedFCType(_fc, props);

        addRecord(data, groupIndex);

        useEffect(() => {
            forceUpdate();
        });

        return (
            <ComponentView color={_inspectedColor ?? colors[level]} desc={_inspectedDesc} name={name} type={_type}>
                {_fc(props)}
            </ComponentView>
        );
    };
    _inspectedFC.displayName = name;
    _inspectedFC.inspected = name;

    _inspectedFC.color = (color) => {
        _inspectedFC._inspectedColor = color;
        return _inspectedFC;
    };

    _inspectedFC.desc = (desc) => {
        _inspectedFC._inspectedDesc = desc;
        return _inspectedFC;
    };

    _inspectedFC.type = (type) => {
        _inspectedFC._inspectedType = type;
        return _inspectedFC;
    };

    return _inspectedFC;
}

export function usePersistInspectedFC<P = {}>(name: string, fc?: React.FC<P>): InspectedFCMaker<P> {
    const inspectedFC = makeInspectedFC(name, fc);

    const persistFC = usePersistFn(inspectedFC);
    persistFC.displayName = name;
    persistFC.inspected = name;

    return persistFC;
}
