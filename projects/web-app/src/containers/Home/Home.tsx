import { RoutePath } from 'src/router/path';

import { PageOverview } from './components/PageOverview';
import type { PageOverviewInfo } from './components/PageOverview';

import css from './Home.module.scss';

const overviews: PageOverviewInfo[] = [
    { title: 'React Rerender Test', /*   */ url: RoutePath.RERENDER_TEST_HOME },
    { title: 'React Performance Test', /*   */ url: RoutePath.PERF_TEST_HOME },
];

export function Home() {
    return (
        <div className={css.layout}>
            <div className={css.title}>Easy-Projs</div>
            <PageOverview overviews={overviews} />
        </div>
    );
}
