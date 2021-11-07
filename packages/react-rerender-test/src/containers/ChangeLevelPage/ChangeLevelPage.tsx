import { useContext } from 'react';

import { Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const Child = makeInspectedFC('Child', () => <div />);

const Sub1 = makeInspectedFC('Sub 1');
const Sub2 = makeInspectedFC('Sub 2');

const ParentPrc = makeInspectedFC('Parent', () => {
    const { selected } = useContext(RenderContext);

    return selected === 0 ? (
        <Child />
    ) : (
        <Sub1>
            <Sub2>
                <Child />
            </Sub2>
        </Sub1>
    );
});

const ParentPtc = makeInspectedFC('Parent', (props) => {
    const { selected } = useContext(RenderContext);

    return selected === 0 ? (
        <>{props.children}</>
    ) : (
        <Sub1>
            <Sub2>{props.children}</Sub2>
        </Sub1>
    );
});

export function ChangeLevelPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller />}>
            <Inspector group="PRC">
                <ParentPrc />
            </Inspector>
            <Inspector group="PTC">
                <ParentPtc>
                    <Child />
                </ParentPtc>
            </Inspector>
        </TestPage>
    );
}