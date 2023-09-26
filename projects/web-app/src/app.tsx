import type { ReactChildrenProps } from '@easy-pkg/helpers-react';
import { ConfigProvider } from 'antd';
import { Suspense } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Page } from './components/Page';
import { BenchmarkProvider } from './contexts/BenchmarkContext';
import { reduxStore } from './redux';
import { routes } from './routes/configs';
import { RoutePath } from './routes/path';

function GlobalProviders(props: ReactChildrenProps): React.ReactNode {
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

function App(): React.ReactNode {
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

export function AppContainer(): React.ReactNode {
    return (
        <GlobalProviders>
            <App />
        </GlobalProviders>
    );
}
