import { ConfigProvider, Layout, Menu, theme } from 'antd';
import { useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router';

import { RoutePath } from 'src/router/path';

import css from './IntroContainer.module.scss';

const menuItems = [
    {
        key: RoutePath.INTRO,
        label: <Link to={RoutePath.INTRO}>Component Overview</Link>,
    },
    {
        key: RoutePath.INTRO_ANTD_FORM_APPENDABLE_LIST,
        label: <Link to={RoutePath.INTRO_ANTD_FORM_APPENDABLE_LIST}>FormAppendableList</Link>,
    },
    {
        key: RoutePath.INTRO_ANTD_FORM_APPENDABLE_TABLE,
        label: <Link to={RoutePath.INTRO_ANTD_FORM_APPENDABLE_TABLE}>FormAppendableTable</Link>,
    },
    { key: RoutePath.INTRO_ANTD_READONLYABLE, label: <Link to={RoutePath.INTRO_ANTD_READONLYABLE}>Readonlyable</Link> },
];

function IntroContainerCore() {
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

export function IntroContainer() {
    return (
        <ConfigProvider button={{ autoInsertSpace: false }}>
            <IntroContainerCore />
        </ConfigProvider>
    );
}
