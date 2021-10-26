import { StrictMode } from 'react';
import { render } from 'react-dom';

import { Introduction } from './components/Introduction';

import './index.css';

render(
    <StrictMode>
        <Introduction />
    </StrictMode>,
    document.getElementById('root'),
);
