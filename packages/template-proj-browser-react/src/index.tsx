import { FluentuiProvider } from '@easy/utils-fluentui';
import { initializeIcons } from '@fluentui/react';
import { StrictMode, Suspense, useEffect } from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { reduxStore, usePrepared, useReduxDispatchingThunks } from './redux';
import { reportWebVitals } from './reportWebVitals';
import { RoutePath, routes } from './router';

import './index.css';
import css from './index.module.scss';

export function ClientArea() {
    const prepared = usePrepared();
    const { prepare } = useReduxDispatchingThunks();

    useEffect(() => {
        prepare();
    }, [prepare]);

    return (
        <div className={css.clientArea}>
            {prepared && (
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.exact ? route.path : `${route.path}/*`}
                                element={<route.component />}
                            />
                        ))}
                        <Route key="/*" path="/*" element={<Navigate to={RoutePath.Home} replace />} />
                    </Routes>
                </Suspense>
            )}
        </div>
    );
}

function main(): void {
    initializeIcons();

    render(
        <StrictMode>
            <FluentuiProvider>
                <ReduxProvider store={reduxStore}>
                    <BrowserRouter basename="/template-proj-browser-react">
                        <ClientArea />
                    </BrowserRouter>
                </ReduxProvider>
            </FluentuiProvider>
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
