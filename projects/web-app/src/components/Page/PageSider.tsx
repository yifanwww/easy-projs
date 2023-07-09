import { Layout, Menu } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Link } from 'react-router-dom';

import type { SiderConfig } from './configs';

import css from './PageSider.module.scss';

interface PageSiderProps {
    configs: SiderConfig[];
    page: string;
}

export function PageSider({ configs, page }: PageSiderProps): JSX.Element {
    const convertConfig = (config: SiderConfig): ItemType => ({
        label: <Link to={config.path}>{config.title}</Link>,
        key: config.path,
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
