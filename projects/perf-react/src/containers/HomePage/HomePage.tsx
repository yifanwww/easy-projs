import { PageOverview } from 'src/components/PageOverview';
import type { PageOverviewInfo } from 'src/components/PageOverview';
import { RoutePath } from 'src/routes';

import css from './HomePage.module.scss';

const overviews: PageOverviewInfo[] = [
    { title: 'Test', url: RoutePath.TEST },
    { title: 'Bar Chart', url: RoutePath.BAR_CHART },
    { title: 'Line Chart', url: RoutePath.LINE_CHART },
];

export function HomePage(): JSX.Element {
    return (
        <div className={css.root}>
            <div className={css.content}>
                <div className={css.title}>React Hooks Performance</div>
                <PageOverview overviews={overviews} />
            </div>
        </div>
    );
}
