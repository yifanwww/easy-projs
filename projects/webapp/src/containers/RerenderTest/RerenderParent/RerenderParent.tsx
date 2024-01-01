import { Button } from 'antd';
import { useContext } from 'react';

import { Inspector } from 'src/components/Inspector';
import { TestPageContainer } from 'src/components/TestPageContainer';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';

const Child = makeInspectedFC('Child', () => <div />);

const ParentPrc = makeInspectedFC('Parent', () => {
    useContext(RenderContext);

    return <Child />;
});

const ParentPtc = makeInspectedFC('Parent', ({ children }) => {
    useContext(RenderContext);

    return <>{children}</>;
});

function Controller(): React.ReactNode {
    const { forceUpdate } = useContext(RenderContext);

    return (
        <Button onClick={forceUpdate} type="primary">
            Force Update
        </Button>
    );
}

const renderController = () => <Controller />;

export function RerenderParent(): React.ReactNode {
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