import { RoutePath } from 'src/routes';

import { PageOverview } from './components/PageOverview';
import type { PageOverviewInfo } from './components/PageOverview';

import css from './HomePage.module.scss';

const overviews: PageOverviewInfo[] = [
    { title: 'React Rerender Test', /*   */ url: RoutePath.RERENDER_TEST_HOME },
    { title: 'React Performance Test', /*   */ url: RoutePath.PERF_TEST_HOME },
];

function HomePage(): JSX.Element {
    return (
        <div className={css.layout}>
            <div className={css.title}>Easy-Projs</div>
            <PageOverview overviews={overviews} />
        </div>
    );
}

export default HomePage;
