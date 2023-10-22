import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

import { PageSider } from './components/PageSider';
import { siderConfigs } from './configs';

export function ClientArea() {
    const pagePath = useLocation().pathname;

    const configs = siderConfigs[pagePath];

    return (
        <Layout>
            {configs && <PageSider configs={configs} page={pagePath} />}
            <Layout style={{ background: 'white' }}>
                <Outlet />
            </Layout>
        </Layout>
    );
}
