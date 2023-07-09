import { Button } from 'antd';
import { useNavigate } from 'react-router';

import css from './PageOverview.module.scss';

export interface PageOverviewInfo {
    title: string;
    url: string;
}

interface PageOverviewItemProps extends PageOverviewInfo {}

function PageOverviewItem({ title, url }: PageOverviewItemProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <Button className={css.item} onClick={() => navigate(url)}>
            <span className={css.title}>{title}</span>
            <code className={css.url}>{url}</code>
        </Button>
    );
}

interface PageOverviewProps {
    overviews: PageOverviewInfo[];
}

export function PageOverview({ overviews }: PageOverviewProps): JSX.Element {
    return (
        <div className={css.layout}>
            {overviews.map((overview) => (
                <PageOverviewItem key={overview.url} {...overview} />
            ))}
        </div>
    );
}
