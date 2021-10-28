import { PageContainer } from 'src/components/Page';
import { IPageOverview, PageOverview } from 'src/components/PageOverview';

import scss from './HomePage.module.scss';

const overviews: IPageOverview[] = [
    { title: 'Change Level', url: '/change-level' },
    { title: 'Change Middle Component', url: '/change-middle-component' },
    { title: 'Change Parent', url: '/change-parent' },
    { title: 'Router Like', url: '/router-like' },
];

export function HomePage(): React.ReactElement {
    return (
        <PageContainer className={scss.pageContainer}>
            <div className={scss.title}>Main</div>
            <PageOverview overviews={overviews} />
        </PageContainer>
    );
}
