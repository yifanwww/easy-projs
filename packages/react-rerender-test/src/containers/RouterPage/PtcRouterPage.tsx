import { generatePath, Redirect, Route, Switch } from 'react-router';

import { RoutePath } from 'src/common/route';
import { TestPage } from 'src/components/TestPage';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const routes: string[] = [1, 2, 3, 4, 5].map((num) => generatePath(RoutePath.PtcRoutePageDetail, { num }));

const Child = makeInspectedFC('Child', () => <div />);

const Router = makeInspectedFC('Router', () => {
    return (
        <Switch>
            {routes.map((route) => (
                <Route key={route} exact path={route}>
                    <Child />
                </Route>
            ))}
            <Route key={RoutePath.PtcRoutePage} path={RoutePath.PtcRoutePage}>
                <Redirect to={generatePath(RoutePath.PtcRoutePageDetail, { num: 1 })} />
            </Route>
        </Switch>
    );
});

export function RouterPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller type="ptc" />}>
            <Router />
        </TestPage>
    );
}
