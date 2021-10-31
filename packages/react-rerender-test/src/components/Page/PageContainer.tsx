import { Layout } from 'antd';
import clsx from 'clsx';

import scss from './Page.module.scss';

export interface IPageContainerProps extends IChildrenProps {
    center?: boolean;
    className?: string;
    gap?: number;
}

export function PageContainer(props: IPageContainerProps): React.ReactElement {
    const { center, children, className, gap } = props;

    return (
        <Layout.Content className={clsx(scss.pageContainer, center && scss.center, className)} style={{ gap }}>
            {children}
        </Layout.Content>
    );
}
