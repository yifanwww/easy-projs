import { Layout } from 'antd';
import { useLocation } from 'react-router';

import { RoutePath } from 'src/routes';

import { siderConfigs } from './configs';
import { PageSidebar } from './PageSidebar';

import css from './styles.module.scss';

export const Page: React.FC = ({ children }) => {
    let pagePath = useLocation().pathname;
    if (pagePath.startsWith(RoutePath.ROUTE)) pagePath = RoutePath.ROUTE;

    const configs = siderConfigs[pagePath];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {configs && <PageSidebar configs={configs} page={pagePath} />}
            <Layout className={css.content}>{children}</Layout>
        </Layout>
    );
};