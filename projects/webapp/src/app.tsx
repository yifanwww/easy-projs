import { ConfigProvider } from 'antd';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { BenchmarkProvider } from './contexts/BenchmarkContext';
import { reduxStore } from './redux';
import { routes } from './router/routes';

const router = createBrowserRouter(routes);

export function AppContainer(): React.ReactNode {
    return (
        <ConfigProvider autoInsertSpaceInButton={false}>
            <ReduxProvider store={reduxStore}>
                <BenchmarkProvider>
                    <RouterProvider router={router} />
                </BenchmarkProvider>
            </ReduxProvider>
        </ConfigProvider>
    );
}
