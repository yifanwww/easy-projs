import { PageContainer } from 'src/components/Page';
import { IPageOverview, PageOverview } from 'src/components/PageOverview';

import scss from './HomePage.module.scss';

const prcOverviews: IPageOverview[] = [
    { title: 'Change Level', url: '/prc/change-level' },
    { title: 'Change Parent', url: '/prc/change-parent' },
    { title: 'Router Like', url: '/prc/router-like' },
];

const ptcOverviews: IPageOverview[] = [
    { title: 'Change Level', url: '/ptc/change-level' },
    { title: 'Change Parent', url: '/ptc/change-parent' },
    { title: 'Router Like', url: '/ptc/router-like' },
];

export function HomePage(): React.ReactElement {
    return (
        <PageContainer className={scss.pageContainer}>
            <div className={scss.title}>Parent renders children</div>
            <PageOverview overviews={prcOverviews} />
            <div className={scss.title}>Pass through children</div>
            <PageOverview overviews={ptcOverviews} />
        </PageContainer>
    );
}
