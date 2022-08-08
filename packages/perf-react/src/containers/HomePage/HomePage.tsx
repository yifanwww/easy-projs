import { IPageOverview, PageOverview } from 'src/components/PageOverview';
import { RoutePath } from 'src/router';

import scss from './HomePage.module.scss';

const overviews: IPageOverview[] = [
    { title: 'Test', url: RoutePath.TestPage },
    { title: 'Bar Chart', url: RoutePath.BarChartPage },
    { title: 'Line Chart', url: RoutePath.LineChartPage },
];

const HomePage: React.FC = () => {
    return (
        <div className={scss.root}>
            <div className={scss.content}>
                <div className={scss.title}>React Hooks Performance</div>
                <PageOverview overviews={overviews} />
            </div>
        </div>
    );
};

export default HomePage;
