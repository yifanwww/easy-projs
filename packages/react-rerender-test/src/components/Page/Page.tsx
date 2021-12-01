import { Layout } from 'antd';

import { PageSidebar } from './PageSidebar';

export const Page: React.FC = (props) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <PageSidebar />
            <Layout>{props.children}</Layout>
        </Layout>
    );
};
