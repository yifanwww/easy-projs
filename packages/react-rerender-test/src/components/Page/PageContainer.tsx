import { Layout } from 'antd';
import clsx from 'clsx';

import scss from './Page.module.scss';

export interface PageContainerProps extends ReactChildrenProps {
    center?: boolean;
    className?: string;
    gap?: number;
}

export function PageContainer(props: PageContainerProps): React.ReactElement {
    const { center, children, className, gap } = props;

    return (
        <Layout.Content className={clsx(scss.pageContainer, center && scss.center, className)} style={{ gap }}>
            {children}
        </Layout.Content>
    );
}
