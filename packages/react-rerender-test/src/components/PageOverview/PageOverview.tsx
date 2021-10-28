import { Button } from 'antd';
import { useHistory } from 'react-router';

import { IPageOverview } from './types';

import scss from './PageOverview.module.scss';

export interface IPageOverviewItemProps extends IPageOverview {}

export function PageOverviewItem(props: Readonly<IPageOverviewItemProps>): React.ReactElement {
    const { title, url } = props;

    const history = useHistory();

    return (
        <Button className={scss.item} onClick={() => history.push(url)}>
            <span className={scss.title}>{title}</span>
            <code className={scss.url}>{url}</code>
        </Button>
    );
}

export interface IPageOverviewProps {
    overviews: IPageOverview[];
}

export function PageOverview(props: Readonly<IPageOverviewProps>): React.ReactElement {
    const { overviews } = props;

    return (
        <div className={scss.root}>
            {overviews.map((overview) => (
                <PageOverviewItem key={overview.url} {...overview} />
            ))}
        </div>
    );
}
