import { useContext } from 'react';

import { TestPage } from 'src/components/TestPage';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const Child = makeInspectedFC('Child', () => <div />);

const Sub1 = makeInspectedFC('Sub 1');
const Sub2 = makeInspectedFC('Sub 2');

const Parent = makeInspectedFC('Parent', (props) => {
    const { selected } = useContext(RenderContext);

    return selected === 0 ? (
        <>{props.children}</>
    ) : (
        <Sub1>
            <Sub2>{props.children}</Sub2>
        </Sub1>
    );
});

export function ChangeLevelPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller />}>
            <Parent>
                <Child />
            </Parent>
        </TestPage>
    );
}
