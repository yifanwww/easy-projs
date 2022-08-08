import { ConfigProvider } from 'antd';
import { StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';

import { Page } from './components/Page';
import { RoutePath, routes } from './router';

import './index.css';

const ClientArea: React.FC = () => (
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

const App: React.FC = () => {
    return (
        <ConfigProvider autoInsertSpaceInButton={false}>
            <BrowserRouter basename="/react-rerender-test">
                <ClientArea />
            </BrowserRouter>
        </ConfigProvider>
    );
};

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root'),
);
