import { Card, Flex } from 'antd';
import { useNavigate } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { IntroConfigs } from '../config';

import css from './IntroOverview.module.css';

interface IntroEntryProps {
    href: string;
    description: string;
}

function IntroEntry({ children, href, description }: React.PropsWithChildren<IntroEntryProps>) {
    const navigate = useNavigate();

    return (
        <Card
            className={css.card}
            hoverable
            onClick={() => navigate(href)}
            styles={{
                body: { padding: '24px' },
            }}
        >
            <Flex vertical gap="small" style={{ width: '100%' }}>
                <div className={css.label}>{children}</div>
                <div className={css.description}>{description}</div>
            </Flex>
        </Card>
    );
}

const menuEntries = Object.values(IntroConfigs);

export function IntroOverview() {
    return (
        <div className={css.overview}>
            <PageHeader
                title="Component Showcase"
                subtitle="Explore our collection of enhanced Ant Design components"
            />
            <div className={css.grid}>
                {menuEntries.map((item) => (
                    <IntroEntry key={item.url} href={item.url} description={item.description}>
                        {item.label}
                    </IntroEntry>
                ))}
            </div>
        </div>
    );
}
