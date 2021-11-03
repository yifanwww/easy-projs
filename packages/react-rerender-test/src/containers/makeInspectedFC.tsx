import { useContext, useEffect } from 'react';

import { ComponentView } from 'src/components/ComponentView';
import { InspectedFC, InspectionContextUpdater, useInpectedComponentData } from 'src/utils/inspection';

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

export interface IMakeInspectedFCOptions {
    name: string;
    srcOfChange: boolean;
}

export function makeInspectedFC<P = {}>(name: string, fc: React.FC<P>): React.FC<P> {
    const _fc: InspectedFC<P> = (props) => {
        const { addRecord, forceUpdate } = useContext(InspectionContextUpdater);

        const data = useInpectedComponentData();
        const level = data.parents.length - 1;

        addRecord(data);

        useEffect(() => {
            forceUpdate();
        });

        return (
            <ComponentView color={colors[level]} name={name}>
                {fc(props)}
            </ComponentView>
        );
    };
    _fc.displayName = name;
    _fc.inspected = name;

    return _fc;
}
