import { useContext } from 'react';

import { Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage';
import { RenderContext } from 'src/contexts/RenderContext';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const Child = makeInspectedFC('Child', () => <div />);

const ParentPrc = makeInspectedFC('Parent', () => {
    useContext(RenderContext);

    return <Child />;
});

const ParentPtc = makeInspectedFC('Parent', ({ children }) => {
    useContext(RenderContext);

    return <>{children}</>;
});

const renderController = () => <Controller />;

export const RerenderParentPage: React.VFC = () => {
    return (
        <TestPage onRenderController={renderController}>
            <Inspector group="PRC">
                <ParentPrc />
            </Inspector>
            <Inspector group="PTC">
                <ParentPtc>
                    <Child />
                </ParentPtc>
            </Inspector>
        </TestPage>
    );
};
