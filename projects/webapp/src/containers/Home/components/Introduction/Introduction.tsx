import { Assets } from 'src/assets';

import css from './Introduction.module.scss';

export function Introduction() {
    return (
        <header className={css.introduction}>
            <img className={css.logo} src={Assets.logo} alt="logo" />
            <p>
                Edit <code>src/containers/Home/components/Introduction/Introduction.tsx</code> and save to reload.
            </p>
            <a
                className={css.link}
                href="https://github.com/yifanwww/easy-projs"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn easy-projs
            </a>
        </header>
    );
}
