import { assert } from '@easy-pkg/utils-browser';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { reportWebVitals } from './reportWebVitals';

import './index.css';

function main(): void {
    const appElement = document.getElementById('app');
    assert(appElement !== null);

    const root = createRoot(appElement);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals(console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    // eslint-disable-next-line no-console
    reportWebVitals(console.info);

    // eslint-disable-next-line no-console
    console.info(`[version]: "${__APP_VERSION__}", [hash]: "${__APP_HASH__}"`);
}

main();
