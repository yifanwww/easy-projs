import { Button } from 'antd';
import { useContext, useEffect } from 'react';

import { createInspectedFC, Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage/TestPage';
import { Color } from 'src/constants';
import { InspectionContextUpdater, InspectionProvider } from 'src/contexts/InspectionContext';
import { RenderContext, RenderContextUpdater, RenderProvider } from 'src/contexts/RenderContext';

const Child = createInspectedFC(() => <div />, { color: Color.Green, name: 'Child' });

const Parent = createInspectedFC(
    (props) => {
        const { forceUpdate } = useContext(InspectionContextUpdater);

        useEffect(() => forceUpdate());

        useContext(RenderContext);

        return <>{props.children}</>;
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
                        <Parent>
                            <Child />
                        </Parent>
                    </Inspector>
                    <ControlButton />
                </RenderProvider>
            </TestPage>
        </InspectionProvider>
    );
}
