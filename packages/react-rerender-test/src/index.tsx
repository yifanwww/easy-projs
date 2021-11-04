import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import './index.css';

import { RoutePath } from './common/route';
import { Page } from './components/Page';
import { getPageInfo, pageRoutePaths } from './containers/configs';

function ClientArea(): React.ReactElement {
    const pageRoutes = pageRoutePaths.map((path) => {
        const pageInfo = getPageInfo(path)!;
        return (
            <Route key={path} exact={pageInfo.exact} path={path}>
                <pageInfo.component />
            </Route>
        );
    });

    return (
        <Page>
            <Switch>
                {pageRoutes}
                <Route key="/" path="/">
                    <Redirect to={RoutePath.HomePage} />
                </Route>
            </Switch>
        </Page>
    );
}

function App(): React.ReactElement {
    return (
        <ConfigProvider autoInsertSpaceInButton={false}>
            <BrowserRouter>
                <ClientArea />
            </BrowserRouter>
        </ConfigProvider>
    );
}

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root'),
);
