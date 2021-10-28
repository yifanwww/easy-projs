import { StrictMode, useContext, useEffect } from 'react';
import { render } from 'react-dom';
import { Redirect, Route, RouteComponentProps, Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import './index.css';

import { PageKey } from './common';
import { Page } from './components/Page';
import { getPageInfo, HomePageKey, pageKeys } from './containers/configs';
import { PageContextUpdater, PageProvider } from './contexts/PageContext';
import { history } from './history';

interface IPageKeyProps {
    pageKey: PageKey;
}

function PageRouteRender(props: Readonly<IPageKeyProps & RouteComponentProps>): React.ReactElement {
    // Every `pageKey` has a corresponding `PageRouteRender` instance,
    // so for every instance the valud of `pageKey` will never change.
    const { pageKey } = props;

    const { setPageKey } = useContext(PageContextUpdater);

    useEffect(() => {
        setPageKey(pageKey);
    }, [pageKey, setPageKey]);

    const pageInfo = getPageInfo(pageKey);
    return <pageInfo.component />;
}

function PageRoute(props: Readonly<IPageKeyProps>): React.ReactElement {
    // Every `pageKey` has a corresponding `PageRoute` instance,
    // so for every instance the valud of `pageKey` will never change.
    const { pageKey } = props;

    return <Route path={pageKey} render={(_props) => <PageRouteRender {..._props} pageKey={pageKey} />} />;
}

function UnknownPageRoute(): React.ReactElement {
    return (
        <Route
            path="*"
            render={(_props) => {
                const { pathname } = _props.location;
                return pageKeys.some((key) => key === pathname) || <Redirect to={HomePageKey} />;
            }}
        />
    );
}

function App(): React.ReactElement {
    const routes = pageKeys.map((pageKey) => <PageRoute key={pageKey} pageKey={pageKey} />);

    const app = (
        <Router history={history}>
            <Page>
                {routes}
                <UnknownPageRoute />
            </Page>
        </Router>
    );

    return <PageProvider>{app}</PageProvider>;
}

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root'),
);
