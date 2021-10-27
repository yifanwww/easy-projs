import { Layout, Menu } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { getPageInfo, pageKeys } from 'src/containers/configs';
import { PageContext } from 'src/contexts/PageContext';

export function PageSidebar() {
    const { pageKey } = useContext(PageContext);

    const items = pageKeys.map((key) => {
        const pageInfo = getPageInfo(key);

        return (
            <Menu.Item key={key}>
                <Link to={pageInfo.pageKey}>{pageInfo.sidebarName}</Link>
            </Menu.Item>
        );
    });

    return (
        <Layout.Sider>
            <div className="logo" />
            <Menu theme="dark" selectedKeys={pageKey ? [pageKey] : undefined} mode="inline">
                {items}
            </Menu>
        </Layout.Sider>
    );
}
