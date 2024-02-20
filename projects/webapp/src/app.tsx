import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { reduxStore } from './redux';
import { routes } from './router/routes';

const router = createBrowserRouter(routes);

export function App(): React.ReactNode {
    return (
        <ReduxProvider store={reduxStore}>
            <RouterProvider router={router} />
        </ReduxProvider>
    );
}
