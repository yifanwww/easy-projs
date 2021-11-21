import { RoutePath } from 'src/common/route';
import { IPageOverview, PageOverview } from 'src/components/PageOverview';

import scss from './HomePage.module.scss';

const overviews: IPageOverview[] = [
    { title: 'Chart', url: RoutePath.ChartPage },
    { title: 'Test', url: RoutePath.TestPage },
];

export function HomePage(): React.ReactElement {
    return (
        <div className={scss.root}>
            <div className={scss.content}>
                <div className={scss.title}>React Hooks Performance</div>
                <PageOverview overviews={overviews} />
            </div>
        </div>
    );
}
