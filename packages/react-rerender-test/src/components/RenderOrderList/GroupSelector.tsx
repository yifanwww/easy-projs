import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import scss from './GroupSelector.module.scss';

export interface GroupSelectorProps {
    group: string;
    toggleNext?: () => void;
    togglePrev?: () => void;
}

export function GroupSelector(props: GroupSelectorProps): React.ReactElement {
    const { group, toggleNext, togglePrev } = props;

    return (
        <div className={scss.root}>
            <Button onClick={togglePrev}>
                <LeftOutlined />
            </Button>
            <span className={scss.selected}>{group}</span>
            <Button onClick={toggleNext}>
                <RightOutlined />
            </Button>
        </div>
    );
}
