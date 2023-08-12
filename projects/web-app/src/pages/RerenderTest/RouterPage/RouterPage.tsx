import { assertIsNumber } from '@easy-pkg/utils-browser';
import { Button } from 'antd';
import { useEffect } from 'react';
import { generatePath, Route, Routes, useNavigate } from 'react-router';

import { Inspector } from 'src/components/Inspector';
import { TestPageContainer } from 'src/components/TestPageContainer';
import { RoutePath } from 'src/routes';

import { makeInspectedFC } from '../makeInspectedFC';

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
            navigate(generatePath(RoutePath.RERENDER_TEST_ROUTE_DETAIL, { num: '1' }), { replace: true });
        }
    }, [navigate, num]);

    return null;
}

function Controller(): JSX.Element {
    const path = RoutePath.RERENDER_TEST_ROUTE_DETAIL;

    const navigate = useNavigate();

    const num = useRouterNum();

    return (
        <div style={{ display: 'flex', gap: '24px' }}>
            <Button
                disabled={num === null}
                onClick={() => {
                    assertIsNumber(num, 'num');
                    navigate(generatePath(path, { num: `${((num + 3) % 5) + 1}` }));
                }}
                type="primary"
            >
                Prev Route
            </Button>
            <Button
                disabled={num === null}
                onClick={() => {
                    assertIsNumber(num, 'num');
                    navigate(generatePath(path, { num: `${(num % 5) + 1}` }));
                }}
                type="primary"
            >
                Next Route
            </Button>
        </div>
    );
}

const renderController = () => <Controller />;

function RouterPage(): JSX.Element {
    return (
        <TestPageContainer onRenderController={renderController}>
            <Inspector group="PTC">
                <RouterPtc />
            </Inspector>
            <CorrectRoute />
        </TestPageContainer>
    );
}

export default RouterPage;
