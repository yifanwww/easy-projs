import { Button } from 'antd';
import { useNavigate } from 'react-router';

import css from './PageOverview.module.scss';

export interface PageOverviewInfo {
    // desc?: string;
    title: string;
    url: string;
}

export interface PageOverviewItemProps extends PageOverviewInfo {}

export const PageOverviewItem: React.FC<PageOverviewItemProps> = (props: PageOverviewItemProps) => {
    const { title, url } = props;

    const navigate = useNavigate();

    return (
        <Button className={css.item} onClick={() => navigate(url)}>
            <span className={css.title}>{title}</span>
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
