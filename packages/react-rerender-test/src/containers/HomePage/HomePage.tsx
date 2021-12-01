import { RoutePath } from 'src/common/route';
import { PageOverview, PageOverviewInfo } from 'src/components/PageOverview';

import scss from './HomePage.module.scss';

const overviews: PageOverviewInfo[] = [
    { title: 'Change Level', /*   */ url: RoutePath.ChangeLevelPage },
    { title: 'Change Parent', /*  */ url: RoutePath.ChangeParentPage },
    { title: 'Nested FC', /*      */ url: RoutePath.NestedFCPage },
    { title: 'Rerender Parent', /**/ url: RoutePath.RerenderParentPage },
    { title: 'Router', /*         */ url: RoutePath.RoutePage },
];

export const HomePage: React.VFC = () => {
    return (
        <div className={scss.root}>
            <div className={scss.title}>React Rerender Test</div>
            <PageOverview overviews={overviews} />
        </div>
    );
};
