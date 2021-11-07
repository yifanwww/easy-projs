import { Button } from 'antd';
import { useContext } from 'react';

import { Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage';
import { RenderContext, RenderContextUpdater } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';

const Parent = makeInspectedFC('Parent', () => {
    useContext(RenderContext);

    const Child = makeInspectedFC('Child', () => <div />);

    return <Child />;
});

function Controller(): React.ReactElement {
    const { forceUpdate } = useContext(RenderContextUpdater);

    return (
        <Button onClick={forceUpdate} type="primary">
            Force Update
        </Button>
    );
}

export function NestedFCPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller />}>
            <Inspector>
                <Parent />
            </Inspector>
        </TestPage>
    );
}
