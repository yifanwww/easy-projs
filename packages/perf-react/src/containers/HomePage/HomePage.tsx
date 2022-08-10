import { IPageOverview, PageOverview } from 'src/components/PageOverview';
import { RoutePath } from 'src/router';

import css from './HomePage.module.scss';

const overviews: IPageOverview[] = [
    { title: 'Test', url: RoutePath.TestPage },
    { title: 'Bar Chart', url: RoutePath.BarChartPage },
    { title: 'Line Chart', url: RoutePath.LineChartPage },
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
