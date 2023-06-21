import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import type { SiderConfig } from './configs';

import css from './styles.module.scss';

interface PageSidebarProps {
    configs: SiderConfig[];
    page: string;
}

export function PageSidebar({ configs, page }: PageSidebarProps): JSX.Element {
    return (
        <Layout.Sider className={css.sider} width={64}>
            <Menu className={css.siderMenu} mode="inline" selectedKeys={[page]}>
                {configs.map((sider) => (
                    <Menu.Item key={sider.path}>
                        <Link to={sider.path}>{sider.icon}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Layout.Sider>
    );
}
