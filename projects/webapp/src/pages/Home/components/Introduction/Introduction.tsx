import { Link } from 'react-router';
import { Assets } from 'src/assets';
import { RoutePath } from 'src/router/path';

import css from './Introduction.module.scss';

export function Introduction() {
    return (
        <div className={css.introduction}>
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
            <Link className={css.link} to={RoutePath.INTRO}>
                Components Intro
            </Link>
        </div>
    );
}
