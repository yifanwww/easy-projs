import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import './index.css';

import { Page } from './components/Page';
import { getPageInfo, homePageURL, pageURLs } from './containers/configs';

function ClientArea(): React.ReactElement {
    const pageRoutes = pageURLs.map((pageURL) => {
        const pageInfo = getPageInfo(pageURL);
        return (
            <Route key={pageURL} exact path={pageURL}>
                <pageInfo.component />
            </Route>
        );
    });

    return (
        <Page>
            <Switch>
                {pageRoutes}
                <Route key="/" path="/">
                    <Redirect to={homePageURL} />
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
