import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { siders } from './sider';

import scss from './Page.module.scss';

export const Page: React.FC = ({ children }) => {
    const pagePath = useLocation().pathname;

    return (
        <Layout>
            <Layout.Sider className={scss.sider} width="128px">
                <Menu className={scss.siderMenu} mode="inline" selectedKeys={[pagePath]}>
                    {siders.map((sider) => (
                        <Menu.Item key={sider.path}>
                            <Link to={sider.path}>{sider.title}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Layout.Sider>
            <Layout className={scss.content}>{children}</Layout>
        </Layout>
    );
};
