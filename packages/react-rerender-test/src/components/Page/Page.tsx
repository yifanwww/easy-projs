import { Layout } from 'antd';

import { PageSidebar } from './PageSidebar';

export function Page(props: Readonly<IChildrenProps>): React.ReactElement {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <PageSidebar />
            <Layout className="site-layout">
                <Layout.Content>{props.children}</Layout.Content>
            </Layout>
        </Layout>
    );
}
