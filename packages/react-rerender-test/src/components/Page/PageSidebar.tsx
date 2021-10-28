import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { getPageInfo, pageURLs } from 'src/containers/configs';
import { usePageURL } from 'src/hooks/usePageURL';

export function PageSidebar() {
    const pageURL = usePageURL();

    const items = pageURLs.map((url) => {
        const pageInfo = getPageInfo(url);

        return (
            <Menu.Item key={url}>
                <Link to={pageInfo.url}>{pageInfo.sidebarName}</Link>
            </Menu.Item>
        );
    });

    return (
        <Layout.Sider>
            <div className="logo" />
            <Menu theme="dark" selectedKeys={pageURL ? [pageURL] : undefined} mode="inline">
                {items}
            </Menu>
        </Layout.Sider>
    );
}
