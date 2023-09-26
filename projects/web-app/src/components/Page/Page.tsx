import type { ReactChildrenProps } from '@easy-pkg/helpers-react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';

import { RoutePath } from 'src/routes/path';

import { siderConfigs } from './configs';
import { PageSider } from './PageSider';

export function Page({ children }: ReactChildrenProps): React.ReactNode {
    let pagePath = useLocation().pathname;
    if (pagePath.startsWith(RoutePath.RERENDER_TEST_ROUTE)) pagePath = RoutePath.RERENDER_TEST_ROUTE;

    const configs = siderConfigs[pagePath];

    return (
        <Layout>
            {configs && <PageSider configs={configs} page={pagePath} />}
            <Layout style={{ background: 'white' }}>{children}</Layout>
        </Layout>
    );
}
