import { Button, Tag } from 'antd';
import { useHistory } from 'react-router';

import { IPageOverview, PageType } from './types';

import scss from './PageOverview.module.scss';

interface IPageTagProps {
    type: PageType;
}

function PageTag(props: IPageTagProps): Optional<React.ReactElement> {
    const { type } = props;

    let never: never;
    switch (type) {
        case 'none':
            return null;
        case 'prc':
            return (
                <Tag className={scss.tag} color="green">
                    prc
                </Tag>
            );
        case 'ptc':
            return (
                <Tag className={scss.tag} color="blue">
                    ptc
                </Tag>
            );

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = type;
            return null;
    }
}

export interface IPageOverviewItemProps extends IPageOverview {}

export function PageOverviewItem(props: IPageOverviewItemProps): React.ReactElement {
    const { title, type, url } = props;

    const history = useHistory();

    return (
        <Button className={scss.item} onClick={() => history.push(url)}>
            <div className={scss.titleContainer}>
                <span className={scss.title}>{title}</span>
                <PageTag type={type} />
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
