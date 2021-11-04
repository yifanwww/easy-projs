import { useContext, useEffect } from 'react';

import { ComponentType } from 'src/common/types';
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

export interface IInspectedOptions {
    color?: string;
    desc?: string;
    name: string;
    type?: ComponentType;
}

export function makeInspectedFC(name: string): <P = {}>(fc?: React.FC<P>) => InspectedFC<P>;
export function makeInspectedFC(options: IInspectedOptions): <P = {}>(fc?: React.FC<P>) => InspectedFC<P>;

export function makeInspectedFC(options: string | IInspectedOptions) {
    const isObj = typeof options === 'object';
    const name = isObj ? options.name : options;
    const { color, desc, type } = isObj ? options : { color: undefined, desc: undefined, type: undefined };

    return function wrapFC<P = {}>(fc?: React.FC<P>) {
        const _fc: React.FC<P> = fc ?? ((props) => <>{props.children}</>);

        const _inspectedFC: InspectedFC<P> = (props) => {
            const { addRecord, forceUpdate } = useContext(InspectionContextUpdater);

            const data = useInpectedComponentData();
            const level = data.parents.length - 1;

            addRecord(data);

            useEffect(() => {
                forceUpdate();
            });

            return (
                <ComponentView color={color ?? colors[level]} desc={desc} name={name} type={type}>
                    {_fc(props)}
                </ComponentView>
            );
        };
        _inspectedFC.displayName = name;
        _inspectedFC.inspected = name;

        return _inspectedFC;
    };
}
