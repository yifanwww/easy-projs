import { ConfigProvider } from 'antd';
import { StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';

import { Page } from './components/Page';
import { BenchmarkProvider } from './contexts/BenchmarkContext';
import { RoutePath, routes } from './router';

import './index.css';

const App: React.FC = () => (
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
                <Route key="/*" path="/*" element={<Navigate to={RoutePath.HomePage} replace />} />
            </Routes>
        </Suspense>
    </Page>
);

const GlobalProviders: React.FC = (props) => (
    <ConfigProvider autoInsertSpaceInButton={false}>
        <BrowserRouter basename="/perf-react">
            <BenchmarkProvider>{props.children}</BenchmarkProvider>
        </BrowserRouter>
    </ConfigProvider>
);

render(
    <StrictMode>
        <GlobalProviders>
            <App />
        </GlobalProviders>
    </StrictMode>,
    document.getElementById('root'),
);
