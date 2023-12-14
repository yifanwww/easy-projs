import { RoutePath } from 'src/router/path';

import { PageOverview } from './components/PageOverview';
import type { PageOverviewInfo } from './components/PageOverview';

import css from './Home.module.scss';

const overviews: PageOverviewInfo[] = [
    { title: 'Test', url: RoutePath.PERF_TEST_TEST },
    { title: 'Bar Chart', url: RoutePath.PERF_TEST_BAR_CHART },
    { title: 'Line Chart', url: RoutePath.PERF_TEST_LINE_CHART },
];

export function Home(): React.ReactNode {
    return (
        <div className={css.layout}>
            <div className={css.content}>
                <div className={css.title}>React Hooks Performance</div>
                <PageOverview overviews={overviews} />
            </div>
        </div>
    );
}
