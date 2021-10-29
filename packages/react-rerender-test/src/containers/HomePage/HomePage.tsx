import { Note } from 'src/components/Note';
import { PageContainer } from 'src/components/Page';
import { IPageOverview, PageOverview } from 'src/components/PageOverview';

import scss from './HomePage.module.scss';

const overviews: IPageOverview[] = [
    { title: 'Change Level', type: 'prc', url: '/prc/change-level' },
    { title: 'Change Level', type: 'ptc', url: '/ptc/change-level' },
    { title: 'Change Parent', type: 'prc', url: '/prc/change-parent' },
    { title: 'Change Parent', type: 'ptc', url: '/ptc/change-parent' },
    { title: 'Nested FC', type: 'none', url: '/nested-fc' },
    { title: 'Rerender Parent', type: 'prc', url: '/prc/rerender-parent' },
    { title: 'Rerender Parent', type: 'ptc', url: '/ptc/rerender-parent' },
    { title: 'Router Like', type: 'prc', url: '/prc/router-like' },
    { title: 'Router Like', type: 'ptc', url: '/ptc/router-like' },
];

export function HomePage(): React.ReactElement {
    return (
        <PageContainer className={scss.pageContainer}>
            <div className={scss.title}>React Rerender Test</div>
            <PageOverview overviews={overviews} />
            <Note />
        </PageContainer>
    );
}
