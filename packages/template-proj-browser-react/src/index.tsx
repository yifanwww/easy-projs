import { FluentuiProvider } from '@easy/utils-fluentui';
import { initializeIcons } from '@fluentui/react';
import { StrictMode, useEffect } from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { RoutePath } from './common/route';
import { getPageInfo, pageRoutePaths } from './containers/configs';
import { mainStore, useMainDispatchingThunks, usePrepared } from './redux';
import { reportWebVitals } from './reportWebVitals';

import './index.css';
import scss from './index.module.scss';

export function ClientArea() {
    const prepared = usePrepared();
    const { prepare } = useMainDispatchingThunks();

    useEffect(() => {
        prepare();
    }, [prepare]);

    const pageRoutes = pageRoutePaths.map((path) => {
        const pageInfo = getPageInfo(path)!;
        return <Route key={path} path={pageInfo.deepMatch ? `${path}/*` : path} element={<pageInfo.component />} />;
    });

    return (
        <div className={scss.clientArea}>
            {prepared && (
                <Routes>
                    {pageRoutes}
                    <Route key="/*" path="/*" element={<Navigate to={RoutePath.HomePage} replace />} />
                </Routes>
            )}
        </div>
    );
}

function main(): void {
    initializeIcons();

    render(
        <StrictMode>
            <FluentuiProvider>
                <BrowserRouter basename="/template-proj-browser-react">
                    <ReduxProvider store={mainStore}>
                        <ClientArea />
                    </ReduxProvider>
                </BrowserRouter>
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
