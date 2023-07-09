import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import css from './GroupSelector.module.scss';

interface GroupSelectorProps {
    group?: string;
    toggleNext?: () => void;
    togglePrev?: () => void;
}

export function GroupSelector({ group, toggleNext, togglePrev }: GroupSelectorProps): JSX.Element {
    return (
        <div className={css.layout}>
            <Button onClick={togglePrev}>
                <LeftOutlined />
            </Button>
            <span className={css.selected}>{group}</span>
            <Button onClick={toggleNext}>
                <RightOutlined />
            </Button>
        </div>
    );
}
