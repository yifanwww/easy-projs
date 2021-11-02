import { Button } from 'antd';
import { useContext, useEffect } from 'react';

import { TestPage } from 'src/components/TestPage/TestPage';
import { Color } from 'src/constants';
import { RenderContext, RenderContextUpdater, RenderProvider } from 'src/contexts/RenderContext';
import { createInspectedFC, InspectionContextUpdater, InspectionProvider, Inspector } from 'src/utils/inspection';

const Child = createInspectedFC(() => <div />, { color: Color.Green, name: 'Child' });

const Parent = createInspectedFC(
    () => {
        const { forceUpdate } = useContext(InspectionContextUpdater);

        useEffect(() => forceUpdate());

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
