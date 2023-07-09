import { RoutePath } from 'src/routes';

import { PageOverview } from './components/PageOverview';
import type { PageOverviewInfo } from './components/PageOverview';

import css from './HomePage.module.scss';

const overviews: PageOverviewInfo[] = [
    { title: 'Change Level', /*   */ url: RoutePath.RERENDER_TEST_CHANGE_LEVEL },
    { title: 'Change Parent', /*  */ url: RoutePath.RERENDER_TEST_CHANGE_PARENT },
    { title: 'Nested FC', /*      */ url: RoutePath.RERENDER_TEST_NESTED_FC },
    { title: 'Rerender Parent', /**/ url: RoutePath.RERENDER_TEST_RERENDER_PARENT },
    { title: 'Router', /*         */ url: RoutePath.RERENDER_TEST_ROUTE },
];

export function HomePage(): JSX.Element {
    return (
        <div className={css.root}>
            <div className={css.title}>React Rerender Test</div>
            <PageOverview overviews={overviews} />
        </div>
    );
}
