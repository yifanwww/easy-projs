import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { getPageInfo, pageRoutePaths } from 'src/containers/configs';

import scss from './Page.module.scss';

export const Page: React.FC = ({ children }) => {
    const items = pageRoutePaths.map((path) => {
        const pageInfo = getPageInfo(path)!;

        return (
            <Menu.Item key={path}>
                <Link to={pageInfo.path}>{pageInfo.sider}</Link>
            </Menu.Item>
        );
    });

    const pagePath = useLocation().pathname;

    return (
        <Layout>
            <Layout.Sider className={scss.sider} width="128px">
                <Menu className={scss.siderMenu} mode="inline" selectedKeys={[pagePath]}>
                    {items}
                </Menu>
            </Layout.Sider>
            <Layout className={scss.content}>{children}</Layout>
        </Layout>
    );
};
