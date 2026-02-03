import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { RoutePath } from 'src/router/path';
import { IntroConfigs } from '../config';

import css from './IntroContainer.module.css';

const menuItems = [
    {
        key: RoutePath.INTRO,
        label: <Link to={RoutePath.INTRO}>Components Overview</Link>,
    },
    ...Object.values(IntroConfigs).map((item) => ({
        key: item.url,
        label: <Link to={item.url}>{item.label}</Link>,
    })),
];

function IntroContainerCore() {
    const location = useLocation();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const selectedKeys = useMemo(() => [location.pathname], [location.pathname]);

    return (
        <Layout>
            <Layout.Sider width={216} className={css.sider}>
                <Menu
                    items={menuItems}
                    selectedKeys={selectedKeys}
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                />
            </Layout.Sider>
            <Layout>
                <Layout.Content className={css.content} style={{ background: colorBgContainer }}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export function IntroContainer() {
    return (
        <ConfigProvider button={{ autoInsertSpace: false }}>
            <IntroContainerCore />
        </ConfigProvider>
    );
}
