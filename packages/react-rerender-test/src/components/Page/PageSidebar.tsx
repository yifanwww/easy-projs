import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { RoutePath } from 'src/common/route';
import { getPageInfo, pageRoutePaths } from 'src/containers/configs';

import scss from './Page.module.scss';

export function PageSidebar() {
    const items = pageRoutePaths.map((path) => {
        const pageInfo = getPageInfo(path)!;

        return (
            <Menu.Item key={path}>
                <Link to={pageInfo.path}>{pageInfo.sider}</Link>
            </Menu.Item>
        );
    });

    let pagePath = useLocation().pathname;
    if (pagePath.startsWith(RoutePath.PrcRoutePage)) pagePath = RoutePath.PrcRoutePage;
    else if (pagePath.startsWith(RoutePath.PtcRoutePage)) pagePath = RoutePath.PtcRoutePage;

    return (
        <Layout.Sider className={scss.sider}>
            <Menu className={scss.siderMenu} mode="inline" selectedKeys={[pagePath]}>
                {items}
            </Menu>
        </Layout.Sider>
    );
}
