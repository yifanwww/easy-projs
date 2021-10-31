import { Button } from 'antd';
import { useContext, useEffect } from 'react';

import { createInspectedFC, Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage/TestPage';
import { Color } from 'src/constants';
import { InspectContextUpdater, InspectProvider } from 'src/contexts/InspectContext';
import { RenderContext, RenderContextUpdater, RenderProvider } from 'src/contexts/RenderContext';

const Child = createInspectedFC(() => <div />, { color: Color.Green, name: 'Child' });

const Parent = createInspectedFC(
    () => {
        const { forceUpdate } = useContext(InspectContextUpdater);

        useEffect(() => {
            forceUpdate();
        }, [forceUpdate]);

        useContext(RenderContext);

        return <Child />;
    },
    { color: Color.Lime, name: 'Parent' },
);

function ControlButton(): React.ReactElement {
    const { forceUpdate } = useContext(RenderContextUpdater);

    return (
        <Button onClick={forceUpdate} type="primary">
            Force Update
        </Button>
    );
}

export function PrcRerenderParentPage(): React.ReactElement {
    return (
        <InspectProvider>
            <TestPage>
                <RenderProvider>
                    <Inspector>
                        <Parent />
                    </Inspector>
                    <ControlButton />
                </RenderProvider>
            </TestPage>
        </InspectProvider>
    );
}
