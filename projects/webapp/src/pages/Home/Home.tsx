import { Introduction } from './components/Introduction';

import css from './Home.module.scss';

export function Home() {
    return (
        <main className={css.main}>
            <Introduction />
        </main>
    );
}
