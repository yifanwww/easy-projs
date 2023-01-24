import type { PickProp } from '@easy-pkg/utils-type';
import { List } from 'antd';
import type { ListProps } from 'antd';
import { useContext } from 'react';

import type { InspectionData } from 'src/common/inspection';
import { InspectionContext, InspectionContextUpdater } from 'src/contexts/InspectionContext';

import { GroupSelector } from './GroupSelector';

import css from './RenderOrderList.module.scss';

export function RenderList() {
    const { data, groups, selectedGroup } = useContext(InspectionContext);
    const { toggleGroup } = useContext(InspectionContextUpdater);

    const showGroupSelector = groups.length > 1;

    const togglePrev = () => toggleGroup('prev');
    const toggleNext = () => toggleGroup('next');

    const renderItem: PickProp<ListProps<InspectionData>, 'renderItem'> = (item) => <List.Item>{item.name}</List.Item>;

    return (
        <div className={css.root}>
            <div className={css.header}>
                <span className={css.title}>Render Order</span>
                {showGroupSelector && (
                    <GroupSelector group={selectedGroup!} toggleNext={toggleNext} togglePrev={togglePrev} />
                )}
            </div>
            <List
                className={css.list}
                dataSource={selectedGroup ? data[selectedGroup].records : undefined}
                renderItem={renderItem}
                size="small"
            />
        </div>
    );
}
