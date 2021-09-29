import { ReactElement } from 'react';

import logo from './logo.svg';
import scss from './Introduction.module.scss';

export function Introduction(): ReactElement {
    return (
        <header className={scss.introduction}>
            <img className={scss.logo} src={logo} alt="logo" />
            <p>
                Edit <code>src/Components/Introduction.tsx</code> and save to reload.
            </p>
            <a
                className={scss.link}
                href="https://github.com/yifanwww/easy-projs"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn easy-projs
            </a>
        </header>
    );
}
