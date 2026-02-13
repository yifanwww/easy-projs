import { Card, Flex, Tag } from 'antd';
import { useNavigate } from 'react-router';
import { DemoPage } from '../components/DemoPage';
import { IntroConfigs } from '../config';

import css from './IntroOverview.module.css';

interface IntroEntryProps {
    description: string;
    href: string;
    label?: string;
    name: string;
}

function IntroEntry({ description, href, label, name }: IntroEntryProps) {
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
                <div className={css.label}>
                    <Flex align="center" gap="small">
                        <span>{name}</span>
                        {!!label && <Tag>{label}</Tag>}
                    </Flex>
                </div>
                <div className={css.description}>{description}</div>
            </Flex>
        </Card>
    );
}

export function IntroOverview() {
    return (
        <DemoPage title="Component Showcase" subtitle="Explore our collection of enhanced Ant Design components">
            <div className={css.grid}>
                {IntroConfigs.map((item) => (
                    <IntroEntry
                        key={item.path}
                        name={item.name}
                        description={item.description}
                        label={item.label}
                        href={item.path}
                    />
                ))}
            </div>
        </DemoPage>
    );
}
