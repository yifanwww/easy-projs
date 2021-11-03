import { Button } from 'antd';
import { useContext } from 'react';

import { TestPage } from 'src/components/TestPage';
import { RenderContext, RenderContextUpdater, RenderProvider } from 'src/contexts/RenderContext';
import { InspectionProvider, Inspector } from 'src/utils/inspection';

import { makeInspectedFC } from '../makeInspectedFC';

const Child = makeInspectedFC('Child', () => <div />);

const Parent = makeInspectedFC('Parent', () => {
    useContext(RenderContext);

    return <Child />;
});

function ControlButton(): React.ReactElement {
    const { forceUpdate } = useContext(RenderContextUpdater);

    return (
        <Button onClick={forceUpdate} type="primary">
            Force Update
        </Button>
    );
}

export function RerenderParentPage(): React.ReactElement {
    return (
        <InspectionProvider>
            <TestPage>
                <RenderProvider>
                    <Inspector>
                        <Parent />
                    </Inspector>
                    <ControlButton />
                </RenderProvider>
            </TestPage>
        </InspectionProvider>
    );
}
