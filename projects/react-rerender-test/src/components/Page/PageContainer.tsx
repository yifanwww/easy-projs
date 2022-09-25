import { Layout } from 'antd';
import clsx from 'clsx';

import css from './Page.module.scss';

export interface PageContainerProps {
    center?: boolean;
    className?: string;
    gap?: number;
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {
    const { center, children, className, gap } = props;

    return (
        <Layout.Content className={clsx(css.pageContainer, center && css.center, className)} style={{ gap }}>
            {children}
        </Layout.Content>
    );
};
