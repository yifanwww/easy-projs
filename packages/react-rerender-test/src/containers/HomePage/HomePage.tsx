import { PageOverview, PageOverviewInfo } from 'src/components/PageOverview';
import { RoutePath } from 'src/router';

import scss from './HomePage.module.scss';

const overviews: PageOverviewInfo[] = [
    { title: 'Change Level', /*   */ url: RoutePath.ChangeLevelPage },
    { title: 'Change Parent', /*  */ url: RoutePath.ChangeParentPage },
    { title: 'Nested FC', /*      */ url: RoutePath.NestedFCPage },
    { title: 'Rerender Parent', /**/ url: RoutePath.RerenderParentPage },
    { title: 'Router', /*         */ url: RoutePath.RoutePage },
];

const HomePage: React.FC = () => {
    return (
        <div className={scss.root}>
            <div className={scss.title}>React Rerender Test</div>
            <PageOverview overviews={overviews} />
        </div>
    );
};

export default HomePage;
