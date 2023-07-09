import type { ReactChildrenProps } from '@easy-pkg/utils-react';
import { Layout } from 'antd';
import { useLocation } from 'react-router';

import { RoutePath } from 'src/routes';

import { siderConfigs } from './configs';
import { PageSider } from './PageSider';

export function Page({ children }: ReactChildrenProps): JSX.Element {
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
