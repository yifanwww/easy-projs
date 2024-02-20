import { Introduction } from './components/Introduction';

import css from './Home.module.scss';

export function Home() {
    return (
        <div className={css.home}>
            <Introduction />
        </div>
    );
}
