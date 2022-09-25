import { useEffect } from 'react';
import { generatePath, Route, Routes, useNavigate } from 'react-router';

import { Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage';
import { RoutePath } from 'src/router';
import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';
import { useRouterNum } from './useRouterNum';

const routes: string[] = [1, 2, 3, 4, 5].map((num) => num.toString());

const Child = makeInspectedFC('Child', () => <div />);

const RouterPtc = makeInspectedFC('Router', () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route key={route} path={route} element={<Child />} />
            ))}
        </Routes>
    );
}).type('ptc');

function CorrectRoute() {
    const num = useRouterNum();
    const navigate = useNavigate();

    useEffect(() => {
        if (num === null) {
            navigate(generatePath(RoutePath.ROUTE_DETAIL, { num: '1' }), { replace: true });
        }
    }, [navigate, num]);

    return null;
}

const renderController = () => <Controller />;

const RouterPage: React.FC = () => {
    return (
        <TestPage onRenderController={renderController}>
            <Inspector group="PTC">
                <RouterPtc />
            </Inspector>
            <CorrectRoute />
        </TestPage>
    );
};

export default RouterPage;
