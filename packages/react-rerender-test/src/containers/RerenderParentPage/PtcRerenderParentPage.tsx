import { useContext } from 'react';

import { TestPage } from 'src/components/TestPage';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const Child = makeInspectedFC('Child', () => <div />);

const Parent = makeInspectedFC('Parent', (props) => {
    useContext(RenderContext);

    return <>{props.children}</>;
});

export function RerenderParentPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller />}>
            <Parent>
                <Child />
            </Parent>
        </TestPage>
    );
}
