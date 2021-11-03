import { Button } from 'antd';
import { useContext } from 'react';

import { TestPage } from 'src/components/TestPage';
import { RenderContext, RenderContextUpdater, RenderProvider } from 'src/contexts/RenderContext';
import { InspectionProvider, Inspector } from 'src/utils/inspection';

import { makeInspectedFC } from '../makeInspectedFC';

const Child = makeInspectedFC('Child', () => <div />);

const Parent1 = makeInspectedFC('Parent 1', (props) => <>{props.children}</>);
const Parent2 = makeInspectedFC('Parent 2', (props) => <>{props.children}</>);

function ParentSelector() {
    const { selected } = useContext(RenderContext);

    const Parent = [Parent1, Parent2][selected];

    return (
        <Parent>
            <Child />
        </Parent>
    );
}

function ControlButton(): React.ReactElement {
    const { selected } = useContext(RenderContext);
    const { select } = useContext(RenderContextUpdater);

    return (
        <Button onClick={() => select(selected === 0 ? 1 : 0)} type="primary">
            Change Parent
        </Button>
    );
}

export function ChangeParentPage(): React.ReactElement {
    return (
        <InspectionProvider>
            <TestPage>
                <RenderProvider>
                    <Inspector>
                        <ParentSelector />
                    </Inspector>
                    <ControlButton />
                </RenderProvider>
            </TestPage>
        </InspectionProvider>
    );
}
