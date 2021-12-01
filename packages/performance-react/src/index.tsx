import { ConfigProvider } from 'antd';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import './index.css';

import { RoutePath } from './common/route';
import { Page } from './components/Page';
import { getPageInfo, pageRoutePaths } from './containers/configs';
import { BenchmarkProvider } from './contexts/BenchmarkContext';

const ClientArea: React.VFC = () => {
    const pageRoutes = pageRoutePaths.map((path) => {
        const pageInfo = getPageInfo(path)!;
        return <Route key={path} path={pageInfo.deepMatch ? `${path}/*` : path} element={<pageInfo.component />} />;
    });

    return (
        <Page>
            <BenchmarkProvider>
                <Routes>
                    {pageRoutes}
                    <Route key="/*" path="/*" element={<Navigate to={RoutePath.HomePage} replace />} />
                </Routes>
            </BenchmarkProvider>
        </Page>
    );
};

const App: React.VFC = () => {
    return (
        <ConfigProvider autoInsertSpaceInButton={false}>
            <BrowserRouter basename="/performance-react">
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
