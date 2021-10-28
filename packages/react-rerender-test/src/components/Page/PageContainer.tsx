import { Layout } from 'antd';
import clsx from 'clsx';

import scss from './Page.module.scss';

export interface IPageContainerProps extends IChildrenProps {
    className?: string;
}

export function PageContainer(props: Readonly<IPageContainerProps>): React.ReactElement {
    const { children, className } = props;

    return <Layout.Content className={clsx(scss.pageContainer, className)}>{children}</Layout.Content>;
}
