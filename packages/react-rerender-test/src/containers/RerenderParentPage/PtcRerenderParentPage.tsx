import { Button } from 'antd';
import { useContext } from 'react';

import { createInspectedFC, Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage/TestPage';
import { Color } from 'src/constants';
import { InspectProvider } from 'src/contexts/InspectContext';
import { RenderContext, RenderContextUpdater, RenderProvider } from 'src/contexts/RenderContext';

const Child = createInspectedFC(() => <div />, { color: Color.Green, name: 'Child' });

const Parent = createInspectedFC(
    (props) => {
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

export function PtcRerenderParentPage(): React.ReactElement {
    return (
        <InspectProvider>
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
        </InspectProvider>
    );
}
