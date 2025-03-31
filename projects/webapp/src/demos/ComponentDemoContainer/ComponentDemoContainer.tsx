import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router';

import { RoutePath } from 'src/router/path';

import css from './ComponentDemoContainer.module.scss';

interface MenuItem {
    key: string;
    label: React.ReactNode;
}

const menuItems: MenuItem[] = [
    {
        key: RoutePath.DEMO,
        label: <Link to={RoutePath.DEMO}>Component Overview</Link>,
    },
    {
        key: RoutePath.DEMO_ANTD_FORM_APPENDABLE_LIST,
        label: <Link to={RoutePath.DEMO_ANTD_FORM_APPENDABLE_LIST}>FormAppendableList</Link>,
    },
    { key: RoutePath.DEMO_ANTD_READONLYABLE, label: <Link to={RoutePath.DEMO_ANTD_READONLYABLE}>Readonlyable</Link> },
];

function ComponentDemoContainerCore() {
    const location = useLocation();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const selectedKeys = useMemo(() => [location.pathname], [location.pathname]);

    return (
        <Layout>
            <Layout.Sider width={192} className={css.sider}>
                <Menu
                    items={menuItems}
                    selectedKeys={selectedKeys}
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                />
            </Layout.Sider>
            <Layout className={css['content-container']}>
                <Layout.Content className={css.content} style={{ background: colorBgContainer }}>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export function ComponentDemoContainer() {
    return (
        <ConfigProvider button={{ autoInsertSpace: false }}>
            <ComponentDemoContainerCore />
        </ConfigProvider>
    );
}
