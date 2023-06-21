import { PageOverview } from 'src/components/PageOverview';
import type { PageOverviewInfo } from 'src/components/PageOverview';
import { RoutePath } from 'src/routes';

import css from './HomePage.module.scss';

const overviews: PageOverviewInfo[] = [
    { title: 'Change Level', /*   */ url: RoutePath.CHANGE_LEVEL },
    { title: 'Change Parent', /*  */ url: RoutePath.CHANGE_PARENT },
    { title: 'Nested FC', /*      */ url: RoutePath.NESTED_FC },
    { title: 'Rerender Parent', /**/ url: RoutePath.RERENDER_PARENT },
    { title: 'Router', /*         */ url: RoutePath.ROUTE },
];

function HomePage(): JSX.Element {
    return (
        <div className={css.root}>
            <div className={css.title}>React Rerender Test</div>
            <PageOverview overviews={overviews} />
        </div>
    );
}

export default HomePage;
