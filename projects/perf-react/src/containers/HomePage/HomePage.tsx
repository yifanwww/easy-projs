import { IPageOverview, PageOverview } from 'src/components/PageOverview';
import { RoutePath } from 'src/router';

import css from './HomePage.module.scss';

const overviews: IPageOverview[] = [
    { title: 'Test', url: RoutePath.TEST },
    { title: 'Bar Chart', url: RoutePath.BAR_CHART },
    { title: 'Line Chart', url: RoutePath.LINE_CHART },
];

const HomePage: React.FC = () => {
    return (
        <div className={css.root}>
            <div className={css.content}>
                <div className={css.title}>React Hooks Performance</div>
                <PageOverview overviews={overviews} />
            </div>
        </div>
    );
};

export default HomePage;
