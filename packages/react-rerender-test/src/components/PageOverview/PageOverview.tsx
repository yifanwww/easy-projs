import { PageOverviewItem } from './PageOverviewItem';

import scss from './PageOverview.module.scss';
import { IPageOverview } from './types';

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
