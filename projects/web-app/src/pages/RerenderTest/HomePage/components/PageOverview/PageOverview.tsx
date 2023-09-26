import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import css from './PageOverview.module.scss';

export interface PageOverviewInfo {
    title: string;
    url: string;
}

interface PageOverviewItemProps extends PageOverviewInfo {}

export function PageOverviewItem({ title, url }: PageOverviewItemProps): React.ReactNode {
    const navigate = useNavigate();

    return (
        <Button className={css.item} onClick={() => navigate(url)}>
            <div className={css.titleContainer}>
                <span className={css.title}>{title}</span>
            </div>
            <code className={css.url}>{url}</code>
        </Button>
    );
}

interface PageOverviewProps {
    overviews: PageOverviewInfo[];
}

export function PageOverview({ overviews }: PageOverviewProps): React.ReactNode {
    const elements = overviews.map((overview) => <PageOverviewItem key={overview.url} {...overview} />);

    return <div className={css.root}>{elements}</div>;
}
