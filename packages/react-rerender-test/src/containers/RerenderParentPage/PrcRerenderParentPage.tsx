import { Button } from 'antd';
import { useContext } from 'react';
import { ComponentView } from 'src/components/ComponentView';
import { PageContainer } from 'src/components/Page';
import { Color } from 'src/constants';
import { RecordProvider } from 'src/contexts/RecordContext';

import { RenderContext, RenderContextUpdater, RenderProvider } from './Context';

function Child(): React.ReactElement {
    return <ComponentView color={Color.Green} name="Child" />;
}

function Parent(): React.ReactElement {
    useContext(RenderContext);

    return <ComponentView color={Color.Lime} name="Parent" onRenderChildren={() => <Child />} />;
}

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
        <RecordProvider>
            <RenderProvider>
                <PageContainer center gap={24}>
                    <Parent />
                    <ControlButton />
                </PageContainer>
            </RenderProvider>
        </RecordProvider>
    );
}
