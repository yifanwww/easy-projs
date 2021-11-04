import { generatePath, Redirect, Route, Switch } from 'react-router';

import { RoutePath } from 'src/common/route';
import { TestPage } from 'src/components/TestPage';

import { makeInspectedFC } from '../makeInspectedFC';
import { Controller } from './Controller';

const routes: string[] = [1, 2, 3, 4, 5].map((num) => generatePath(RoutePath.PrcRoutePageDetail, { num }));

const Child = makeInspectedFC('Child', () => <div />);

const Router = makeInspectedFC('Router', () => {
    return (
        <Switch>
            {routes.map((route) => (
                <Route key={route} exact path={route} render={() => <Child />} />
            ))}
            <Route key={RoutePath.PrcRoutePage} path={RoutePath.PrcRoutePage}>
                <Redirect to={generatePath(RoutePath.PrcRoutePageDetail, { num: 1 })} />
            </Route>
        </Switch>
    );
});

export function RouterPage(): React.ReactElement {
    return (
        <TestPage onRenderController={() => <Controller type="prc" />}>
            <Router />
        </TestPage>
    );
}
