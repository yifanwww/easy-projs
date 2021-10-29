import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { getPageInfo, pageURLs } from 'src/containers/configs';
import { usePageURL } from 'src/hooks/usePageURL';

import scss from './Page.module.scss';

export function PageSidebar() {
    const pageURL = usePageURL();

    const items = pageURLs.map((url) => {
        const pageInfo = getPageInfo(url);

        return (
            <Menu.Item key={url}>
                <Link to={pageInfo.url}>{pageInfo.siderName}</Link>
            </Menu.Item>
        );
    });

    return (
        <Layout.Sider className={scss.sider}>
            <Menu className={scss.siderMenu} mode="inline" selectedKeys={[pageURL]}>
                {items}
            </Menu>
        </Layout.Sider>
    );
}
