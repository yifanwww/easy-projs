import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import type { SiderConfig } from './configs';

import css from './styles.module.scss';

export interface PageSidebarProps {
    configs: SiderConfig[];
    page: string;
}

export const PageSidebar: React.FC<PageSidebarProps> = ({ configs, page }) => (
    <Layout.Sider className={css.sider}>
        <Menu className={css.siderMenu} mode="inline" selectedKeys={[page]}>
            {configs.map((sider) => (
                <Menu.Item key={sider.path}>
                    <Link to={sider.path}>{sider.title}</Link>
                </Menu.Item>
            ))}
        </Menu>
    </Layout.Sider>
);
