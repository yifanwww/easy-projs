import { StrictMode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { render } from 'react-dom';

// setup.ts adds custom functions into global.
import './setup';

import { ClientArea } from './Containers/ClientArea';
import { mainStore } from './Redux';
import { reportWebVitals } from './report-web-vitals';

import './index.css';

function main(): void {
    render(
        <StrictMode>
            <ReduxProvider store={mainStore}>
                <ClientArea />
            </ReduxProvider>
        </StrictMode>,
        document.getElementById('root'),
    );

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals(console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    reportWebVitals(console.info);
}

main();
