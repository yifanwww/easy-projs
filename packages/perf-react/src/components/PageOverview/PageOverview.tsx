import { Button } from 'antd';
import { useNavigate } from 'react-router';

import css from './PageOverview.module.scss';

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
        <Button className={css.item} onClick={() => navigate(url)}>
            <span className={css.title}>{title}</span>
            <code className={css.url}>{url}</code>
        </Button>
    );
};

export interface IPageOverviewProps {
    overviews: IPageOverview[];
}

export const PageOverview: React.FC<IPageOverviewProps> = ({ overviews }) => {
    const elements = overviews.map((overview) => <PageOverviewItem key={overview.url} {...overview} />);

    return <div className={css.root}>{elements}</div>;
};
