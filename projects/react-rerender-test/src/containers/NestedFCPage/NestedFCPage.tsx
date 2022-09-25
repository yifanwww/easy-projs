import { Button } from 'antd';
import { useCallback, useContext, useMemo } from 'react';

import { Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage';
import { RenderContext, RenderContextUpdater } from 'src/contexts/RenderContext';

import { makeInspectedFC, usePersistInspectedFC } from '../makeInspectedFC';

const ParentNC = makeInspectedFC('Parent', () => {
    useContext(RenderContext);

    const Child = makeInspectedFC('Nested Child', () => <div />);

    return <Child />;
});

const ParentPNC = makeInspectedFC('Parent', () => {
    useContext(RenderContext);

    const Child1 = useMemo(() => makeInspectedFC('Memoed Child', () => <div />), []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const Child2 = useCallback(
        makeInspectedFC('Memoed Child callback', () => <div />),
        [],
    );

    const Child3 = usePersistInspectedFC('Persist Child fn', () => <div />);

    return (
        <>
            <Child1 />
            <Child2 />
            <Child3 />
        </>
    );
});

const Controller: React.FC = () => {
    const { forceUpdate } = useContext(RenderContextUpdater);

    return (
        <Button onClick={forceUpdate} type="primary">
            Force Update
        </Button>
    );
};

const renderController = () => <Controller />;

const NestedFCPage: React.FC = () => {
    return (
        <TestPage onRenderController={renderController}>
            <Inspector group="Nested FC">
                <ParentNC />
            </Inspector>
            <Inspector group="Memoed & Persist Nested FC">
                <ParentPNC />
            </Inspector>
        </TestPage>
    );
};

export default NestedFCPage;
