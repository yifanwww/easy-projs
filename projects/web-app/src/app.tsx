import type { ReactChildrenProps } from '@easy-pkg/utils-react';
import { ConfigProvider } from 'antd';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { Page } from './components/Page';
import { BenchmarkProvider } from './contexts/BenchmarkContext';
import { RoutePath, routes } from './routes';

function GlobalProviders(props: ReactChildrenProps): JSX.Element {
    return (
        <ConfigProvider autoInsertSpaceInButton={false}>
            <BrowserRouter>
                <BenchmarkProvider>{props.children}</BenchmarkProvider>
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
