import type { ReactChildrenProps } from '@easy-pkg/utils-react';
import { ConfigProvider } from 'antd';
import { Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { Page } from './components/Page';
import { BenchmarkProvider } from './contexts/BenchmarkContext';
import { reduxStore } from './redux';
import { RoutePath, routes } from './routes';

function GlobalProviders(props: ReactChildrenProps): JSX.Element {
    return (
        <ConfigProvider autoInsertSpaceInButton={false}>
            <BrowserRouter>
                <ReduxProvider store={reduxStore}>
                    <BenchmarkProvider>{props.children}</BenchmarkProvider>
                </ReduxProvider>
            </BrowserRouter>
        </ConfigProvider>
    );
}

function App(): JSX.Element {
    return (
        <Page>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.exact ? route.path : `${route.path}/*`}
                            element={<route.component />}
                        />
                    ))}
                    <Route key="/*" path="/*" element={<Navigate to={RoutePath.HOME} replace />} />
                </Routes>
            </Suspense>
        </Page>
    );
}

export function AppContainer(): JSX.Element {
    return (
        <GlobalProviders>
            <App />
        </GlobalProviders>
    );
}