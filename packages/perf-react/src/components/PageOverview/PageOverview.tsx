import { Button } from 'antd';
import { useNavigate } from 'react-router';

import scss from './PageOverview.module.scss';

export interface IPageOverview {
    desc?: string;
    title: string;
    url: string;
}

export interface IPageOverviewItemProps extends IPageOverview {}

export const PageOverviewItem: React.FC<IPageOverviewItemProps> = (props: IPageOverviewItemProps) => {
    const { title, url } = props;

    const navigate = useNavigate();

    return (
        <Button className={scss.item} onClick={() => navigate(url)}>
            <span className={scss.title}>{title}</span>
            <code className={scss.url}>{url}</code>
        </Button>
    );
};

export interface IPageOverviewProps {
    overviews: IPageOverview[];
}

export const PageOverview: React.FC<IPageOverviewProps> = ({ overviews }) => {
    const elements = overviews.map((overview) => <PageOverviewItem key={overview.url} {...overview} />);

    return <div className={scss.root}>{elements}</div>;
};
