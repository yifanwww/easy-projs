import type { ReactChildrenProps } from '@easy-pkg/utils-react';
import { StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { reportWebVitals } from './reportWebVitals';
import { RoutePath, routes } from './routes';

import './index.css';
import css from './index.module.scss';

function App(): JSX.Element {
    return (
        <div className={css.clientArea}>
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
        </div>
    );
}

function GlobalProviders(props: ReactChildrenProps): JSX.Element {
    return <BrowserRouter>{props.children}</BrowserRouter>;
}

function main(): void {
    render(
        <StrictMode>
            <GlobalProviders>
                <App />
            </GlobalProviders>
        </StrictMode>,
        document.getElementById('root'),
    );

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals(console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    // eslint-disable-next-line no-console
    reportWebVitals(console.info);
}

main();
