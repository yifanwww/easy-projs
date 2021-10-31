import { Layout } from 'antd';

import { PageSidebar } from './PageSidebar';

export function Page(props: IChildrenProps): React.ReactElement {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <PageSidebar />
            <Layout>{props.children}</Layout>
        </Layout>
    );
}
