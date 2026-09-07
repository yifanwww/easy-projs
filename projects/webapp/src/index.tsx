import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { reportWebVitals } from './reportWebVitals';

import './index.css';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function to log results
// (for example: reportWebVitals(console.log)) or send to an analytics endpoint.
// Learn more: https://create-react-app.dev/docs/measuring-performance/
// eslint-disable-next-line no-console
reportWebVitals(console.info);

// eslint-disable-next-line no-console
console.info(`[version]: "${__APP_VERSION__}", [hash]: "${__APP_HASH__}"`);
