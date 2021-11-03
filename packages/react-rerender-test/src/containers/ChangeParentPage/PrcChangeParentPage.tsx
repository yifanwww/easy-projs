import { useContext } from 'react';

import { TestPage } from 'src/components/TestPage';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const Child = makeInspectedFC('Child', () => <div />);

const Parent1 = makeInspectedFC('Parent 1', () => <Child />);
const Parent2 = makeInspectedFC('Parent 2', () => <Child />);

function ParentSelector() {
    const { selected } = useContext(RenderContext);

    const Parent = [Parent1, Parent2][selected];

    return <Parent />;
}

export function ChangeParentPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller />}>
            <ParentSelector />
        </TestPage>
    );
}
