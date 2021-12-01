import { Layout } from 'antd';
import clsx from 'clsx';

import scss from './Page.module.scss';

export interface PageContainerProps {
    center?: boolean;
    className?: string;
    gap?: number;
}

export const PageContainer: React.FC<PageContainerProps> = (props) => {
    const { center, children, className, gap } = props;

    return (
        <Layout.Content className={clsx(scss.pageContainer, center && scss.center, className)} style={{ gap }}>
            {children}
        </Layout.Content>
    );
};
