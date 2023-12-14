import type { PickProp } from '@easy-pkg/utils-type';
import { List } from 'antd';
import type { ListProps } from 'antd';
import Scrollbars from 'rc-scrollbars';
import { useContext } from 'react';

import { InspectionContext, InspectionUpdaterContext } from 'src/contexts/InspectionContext';
import type { InspectionData } from 'src/types/inspection';

import { GroupSelector } from './GroupSelector';

import css from './RenderOrderList.module.scss';

export function RenderOrderList() {
    const { data, groups, selectedGroup } = useContext(InspectionContext);
    const { toggleGroup } = useContext(InspectionUpdaterContext);

    const showGroupSelector = groups.length > 1;

    const togglePrev = () => toggleGroup('prev');
    const toggleNext = () => toggleGroup('next');

    const renderItem: PickProp<ListProps<InspectionData>, 'renderItem'> = (item) => <List.Item>{item.name}</List.Item>;

    return (
        <div className={css.layout}>
            <div className={css.header}>
                <span className={css.title}>Render Order</span>
                {showGroupSelector && (
                    <GroupSelector group={selectedGroup} toggleNext={toggleNext} togglePrev={togglePrev} />
                )}
            </div>
            <Scrollbars>
                <List
                    className={css.list}
                    dataSource={selectedGroup ? data[selectedGroup].records : undefined}
                    renderItem={renderItem}
                    size="small"
                />
            </Scrollbars>
        </div>
    );
}
