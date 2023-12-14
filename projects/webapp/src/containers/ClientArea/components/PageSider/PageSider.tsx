import { Layout, Menu } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Link } from 'react-router-dom';

import type { SiderConfig } from '../../configs';

import css from './PageSider.module.scss';

interface PageSiderProps {
    configs: SiderConfig[];
    page: string;
}

export function PageSider({ configs, page }: PageSiderProps): React.ReactNode {
    const convertConfig = (config: SiderConfig): ItemType => ({
        key: config.path,
        label: <Link to={config.path}>{config.title}</Link>,
        icon: config.icon,
        children: config.children?.map((child) => convertConfig(child)),
    });

    return (
        <Layout.Sider className={css.sider}>
            <Menu
                className={css.siderMenu}
                items={configs.map((config) => convertConfig(config))}
                mode="inline"
                selectedKeys={[page]}
            />
        </Layout.Sider>
    );
}
