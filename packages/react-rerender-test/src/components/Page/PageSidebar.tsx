import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { RoutePath } from 'src/router';
import { siders } from './sider';

import scss from './Page.module.scss';

export function PageSidebar() {
    let pagePath = useLocation().pathname;
    if (pagePath.startsWith(RoutePath.RoutePage)) pagePath = RoutePath.RoutePage;

    return (
        <Layout.Sider className={scss.sider}>
            <Menu className={scss.siderMenu} mode="inline" selectedKeys={[pagePath]}>
                {siders.map((sider) => (
                    <Menu.Item key={sider.path}>
                        <Link to={sider.path}>{sider.title}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Layout.Sider>
    );
}
