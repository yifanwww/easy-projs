import { Button } from 'antd';
import { useHistory } from 'react-router';

import { IPageOverview } from './types';

import scss from './PageOverview.module.scss';

export interface IPageOverviewItemProps extends IPageOverview {}

export function PageOverviewItem(props: IPageOverviewItemProps): React.ReactElement {
    const { title, url } = props;

    const history = useHistory();

    return (
        <Button className={scss.item} onClick={() => history.push(url)}>
            <div className={scss.titleContainer}>
                <span className={scss.title}>{title}</span>
            </div>
            <code className={scss.url}>{url}</code>
        </Button>
    );
}

export interface IPageOverviewProps {
    overviews: IPageOverview[];
}

export function PageOverview(props: IPageOverviewProps): React.ReactElement {
    const { overviews } = props;

    const elements = overviews.map((overview) => <PageOverviewItem key={overview.url} {...overview} />);

    return <div className={scss.root}>{elements}</div>;
}
