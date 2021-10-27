import Assets from '@easy/assets';
import { ReactElement } from 'react';

import scss from './Introduction.module.scss';

export function Introduction(): ReactElement {
    return (
        <header className={scss.introduction}>
            <img className={scss.logo} src={Assets.logo} alt="logo" />
            <p>
                Edit <code>src/components/Introduction/Introduction.tsx</code> and save to reload.
            </p>
            <a
                className={scss.link}
                href="https://github.com/yifanwww/easy-projs"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn react-rerender-test
            </a>
        </header>
    );
}
