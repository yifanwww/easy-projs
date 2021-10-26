import { FluentuiProvider } from '@easy/utils-fluentui';
import { initializeIcons } from '@fluentui/react';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import { ClientArea } from './containers/ClientArea';
import { mainStore } from './redux';
import { reportWebVitals } from './reportWebVitals';

import './index.css';

function main(): void {
    initializeIcons();

    render(
        <StrictMode>
            <FluentuiProvider>
                <ReduxProvider store={mainStore}>
                    <ClientArea />
                </ReduxProvider>
            </FluentuiProvider>
        </StrictMode>,
        document.getElementById('root'),
    );

    // If you want to start measuring performance in your app, pass a function to log results
    // (for example: reportWebVitals(console.log)) or send to an analytics endpoint.
    // Learn more: https://bit.ly/CRA-vitals
    reportWebVitals(console.info);
}

main();
