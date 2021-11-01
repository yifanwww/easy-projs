import { Layout } from 'antd';

import { RenderList } from '../RenderList';

import scss from './TestPage.module.scss';

export interface IPageContainerProps extends IChildrenProps {}

export function TestPage(props: IPageContainerProps): React.ReactElement {
    const { children } = props;

    return (
        <Layout.Content className={scss.root}>
            <div className={scss.view}>{children}</div>
            <RenderList />
        </Layout.Content>
    );
}
