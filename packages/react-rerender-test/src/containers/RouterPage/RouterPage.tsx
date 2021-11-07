import { generatePath, Redirect, Route, Switch } from 'react-router';

import { RoutePath } from 'src/common/route';
import { Inspector } from 'src/components/Inspector';
import { TestPage } from 'src/components/TestPage';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const routes: string[] = [1, 2, 3, 4, 5].map((num) => generatePath(RoutePath.RoutePageDetail, { num }));

const Child = makeInspectedFC('Child', () => <div />);

const RouterPrc = makeInspectedFC('Router', () => {
    return (
        <Switch>
            {routes.map((route) => (
                <Route key={route} exact path={route} render={() => <Child />} />
            ))}
        </Switch>
    );
}).type('prc');

const RouterPtc = makeInspectedFC('Router', () => {
    return (
        <Switch>
            {routes.map((route) => (
                <Route key={route} exact path={route}>
                    <Child />
                </Route>
            ))}
        </Switch>
    );
}).type('ptc');

export function RouterPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller />}>
            <Inspector group="prc">
                <RouterPrc />
            </Inspector>
            <Inspector group="ptc">
                <RouterPtc />
            </Inspector>
            <Route key={RoutePath.RoutePage} path={RoutePath.RoutePage}>
                <Redirect to={generatePath(RoutePath.RoutePageDetail, { num: 1 })} />
            </Route>
        </TestPage>
    );
}
