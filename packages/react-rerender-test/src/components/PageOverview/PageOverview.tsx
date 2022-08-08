import { Button } from 'antd';
import { useNavigate } from 'react-router';

import { PageOverviewInfo } from './types';

import scss from './PageOverview.module.scss';

export interface PageOverviewItemProps extends PageOverviewInfo {}

export const PageOverviewItem: React.FC<PageOverviewItemProps> = ({ title, url }) => {
    const navigate = useNavigate();

    return (
        <Button className={scss.item} onClick={() => navigate(url)}>
            <div className={scss.titleContainer}>
                <span className={scss.title}>{title}</span>
            </div>
            <code className={scss.url}>{url}</code>
        </Button>
    );
};

export interface PageOverviewProps {
    overviews: PageOverviewInfo[];
}

export const PageOverview: React.FC<PageOverviewProps> = ({ overviews }) => {
    const elements = overviews.map((overview) => <PageOverviewItem key={overview.url} {...overview} />);

    return <div className={scss.root}>{elements}</div>;
};
