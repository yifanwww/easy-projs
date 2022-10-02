import { Button } from 'antd';
import { useNavigate } from 'react-router';

import type { PageOverviewInfo } from './types';

import css from './PageOverview.module.scss';

export interface PageOverviewItemProps extends PageOverviewInfo {}

export const PageOverviewItem: React.FC<PageOverviewItemProps> = ({ title, url }) => {
    const navigate = useNavigate();

    return (
        <Button className={css.item} onClick={() => navigate(url)}>
            <div className={css.titleContainer}>
                <span className={css.title}>{title}</span>
            </div>
            <code className={css.url}>{url}</code>
        </Button>
    );
};

export interface PageOverviewProps {
    overviews: PageOverviewInfo[];
}

export const PageOverview: React.FC<PageOverviewProps> = ({ overviews }) => {
    const elements = overviews.map((overview) => <PageOverviewItem key={overview.url} {...overview} />);

    return <div className={css.root}>{elements}</div>;
};
