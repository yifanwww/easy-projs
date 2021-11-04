import { RoutePath } from 'src/common/route';
import { Note } from 'src/components/Note';
import { IPageOverview, PageOverview } from 'src/components/PageOverview';

import scss from './HomePage.module.scss';

const overviews: IPageOverview[] = [
    { title: 'Change Level', /*   */ type: 'prc', url: RoutePath.PrcChangeLevelPage },
    { title: 'Change Level', /*   */ type: 'ptc', url: RoutePath.PtcChangeLevelPage },
    { title: 'Change Parent', /*  */ type: 'prc', url: RoutePath.PrcChangeParentPage },
    { title: 'Change Parent', /*  */ type: 'ptc', url: RoutePath.PtcChangeParentPage },
    { title: 'Nested FC', /*      */ type: 'nil', url: RoutePath.NestedFCPage },
    { title: 'Rerender Parent', /**/ type: 'prc', url: RoutePath.PrcRerenderParentPage },
    { title: 'Rerender Parent', /**/ type: 'ptc', url: RoutePath.PtcRerenderParentPage },
    { title: 'Router', /*         */ type: 'prc', url: RoutePath.PrcRoutePage },
    { title: 'Router', /*         */ type: 'ptc', url: RoutePath.PtcRoutePage },
];

export function HomePage(): React.ReactElement {
    return (
        <div className={scss.root}>
            <div className={scss.title}>React Rerender Test</div>
            <PageOverview overviews={overviews} />
            <Note />
        </div>
    );
}
