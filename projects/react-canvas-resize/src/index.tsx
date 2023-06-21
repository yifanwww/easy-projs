import type { ReactChildrenProps } from '@easy-pkg/utils-react';
import { StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { RoutePath, routes } from './routes';

import './index.css';

function App(): JSX.Element {
    return (
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
    );
}

function GlobalProviders(props: ReactChildrenProps): JSX.Element {
    return <BrowserRouter basename="/react-canvas-resize">{props.children}</BrowserRouter>;
}

render(
    <StrictMode>
        <GlobalProviders>
            <App />
        </GlobalProviders>
    </StrictMode>,
    document.getElementById('root'),
);
