import { useContext } from 'react';

import { TestPage } from 'src/components/TestPage';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const Child = makeInspectedFC('Child')(() => <div />);

const ParentPrc = makeInspectedFC({ name: 'Parent', type: 'prc' })(() => {
    useContext(RenderContext);

    return <Child />;
});

const ParentPtc = makeInspectedFC({ name: 'Parent', type: 'ptc' })((props) => {
    useContext(RenderContext);

    return <>{props.children}</>;
});

export function RerenderParentPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller />}>
            <ParentPrc />
            <ParentPtc>
                <Child />
            </ParentPtc>
        </TestPage>
    );
}
