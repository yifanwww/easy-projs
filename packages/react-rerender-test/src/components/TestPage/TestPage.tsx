import { Layout } from 'antd';

import scss from './TestPage.module.scss';

export interface IPageContainerProps extends IChildrenProps {}

export function TestPage(props: IPageContainerProps): React.ReactElement {
    const { children } = props;

    return <Layout.Content className={scss.root}>{children}</Layout.Content>;
}
