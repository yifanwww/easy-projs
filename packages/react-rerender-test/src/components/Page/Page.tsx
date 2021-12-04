import { Layout } from 'antd';

import { PageSidebar } from './PageSidebar';

export const Page: React.FC = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <PageSidebar />
            <Layout>{children}</Layout>
        </Layout>
    );
};
