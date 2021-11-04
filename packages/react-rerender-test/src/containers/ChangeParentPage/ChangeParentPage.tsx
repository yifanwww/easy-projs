import { useContext } from 'react';

import { TestPage } from 'src/components/TestPage';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const Child = makeInspectedFC('Child')(() => <div />);

const ParentPrc1 = makeInspectedFC({ name: 'Parent 1', type: 'prc' })(() => <Child />);
const ParentPrc2 = makeInspectedFC({ name: 'Parent 2', type: 'prc' })(() => <Child />);

const ParentPtc1 = makeInspectedFC({ name: 'Parent 1', type: 'ptc' })(() => <Child />);
const ParentPtc2 = makeInspectedFC({ name: 'Parent 2', type: 'ptc' })(() => <Child />);

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

export function ChangeParentPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller />}>
            <ParentSelectorPrc />
            <ParentSelectorPtc />
        </TestPage>
    );
}
