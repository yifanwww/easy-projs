import { StrictMode } from 'react';
import { render } from 'react-dom';

import 'antd/dist/antd.css';

import { AppContainer } from './app';
import { reportWebVitals } from './reportWebVitals';

import './index.css';

function main(): void {
    render(
        <StrictMode>
            <AppContainer />
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
