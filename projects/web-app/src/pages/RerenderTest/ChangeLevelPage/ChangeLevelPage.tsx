import { Button } from 'antd';
import { useContext } from 'react';

import { Inspector } from 'src/components/Inspector';
import { TestPageContainer } from 'src/components/TestPageContainer';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';

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

const ParentPtc = makeInspectedFC('Parent', ({ children }) => {
    const { selected } = useContext(RenderContext);

    return selected === 0 ? (
        <>{children}</>
    ) : (
        <Sub1>
            <Sub2>{children}</Sub2>
        </Sub1>
    );
});

function Controller(): JSX.Element {
    const { select, selected } = useContext(RenderContext);

    return (
        <Button onClick={() => select(selected === 0 ? 1 : 0)} type="primary">
            Change Level
        </Button>
    );
}

const renderController = () => <Controller />;

export function ChangeLevelPage(): JSX.Element {
    return (
        <TestPageContainer onRenderController={renderController}>
            <Inspector group="PRC">
                <ParentPrc />
            </Inspector>
            <Inspector group="PTC">
                <ParentPtc>
                    <Child />
                </ParentPtc>
            </Inspector>
        </TestPageContainer>
    );
}
