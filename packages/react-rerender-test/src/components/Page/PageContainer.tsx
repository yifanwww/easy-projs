import { Layout } from 'antd';

export interface IPageContainerProps extends IChildrenProps {}

export function PageContainer(props: Readonly<IPageContainerProps>): React.ReactElement {
    const { children } = props;

    return <Layout.Content>{children}</Layout.Content>;
}
