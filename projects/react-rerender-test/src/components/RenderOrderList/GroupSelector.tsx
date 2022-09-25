import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import css from './GroupSelector.module.scss';

export interface GroupSelectorProps {
    group: string;
    toggleNext?: () => void;
    togglePrev?: () => void;
}

export const GroupSelector: React.FC<GroupSelectorProps> = ({ group, toggleNext, togglePrev }) => {
    return (
        <div className={css.root}>
            <Button onClick={togglePrev}>
                <LeftOutlined />
            </Button>
            <span className={css.selected}>{group}</span>
            <Button onClick={toggleNext}>
                <RightOutlined />
            </Button>
        </div>
    );
};
