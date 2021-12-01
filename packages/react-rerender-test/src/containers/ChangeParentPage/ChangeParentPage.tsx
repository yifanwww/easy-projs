import { useContext } from 'react';

import { Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

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

const renderController = () => <Controller />;

export const ChangeParentPage: React.VFC = () => {
    return (
        <TestPage onRenderController={renderController}>
            <Inspector group="PRC">
                <ParentSelectorPrc />
            </Inspector>
            <Inspector group="PTC">
                <ParentSelectorPtc />
            </Inspector>
        </TestPage>
    );
};
