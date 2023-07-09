import { Button } from 'antd';
import { useContext } from 'react';

import { Inspector } from 'src/components/Inspector';
import { TestPageContainer } from 'src/components/TestPageContainer';
import { RenderContext, RenderContextUpdater } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';

const Child = makeInspectedFC('Child', () => <div />);

const ParentPrc1 = makeInspectedFC('Parent 1', () => <Child />);
const ParentPrc2 = makeInspectedFC('Parent 2', () => <Child />);

const ParentPtc1 = makeInspectedFC('Parent 1');
const ParentPtc2 = makeInspectedFC('Parent 2');

function ParentSelectorPrc() {
    const { selected } = useContext(RenderContext);

    const Parent = [ParentPrc1, ParentPrc2][selected];

    return <Parent />;
}

function ParentSelectorPtc() {
    const { selected } = useContext(RenderContext);

    const Parent = [ParentPtc1, ParentPtc2][selected];

    return (
        <Parent>
            <Child />
        </Parent>
    );
}

function Controller(): JSX.Element {
    const { selected } = useContext(RenderContext);
    const { select } = useContext(RenderContextUpdater);

    return (
        <Button onClick={() => select(selected === 0 ? 1 : 0)} type="primary">
            Change Parent
        </Button>
    );
}

const renderController = () => <Controller />;

function ChangeParentPage(): JSX.Element {
    return (
        <TestPageContainer onRenderController={renderController}>
            <Inspector group="PRC">
                <ParentSelectorPrc />
            </Inspector>
            <Inspector group="PTC">
                <ParentSelectorPtc />
            </Inspector>
        </TestPageContainer>
    );
}

export default ChangeParentPage;
