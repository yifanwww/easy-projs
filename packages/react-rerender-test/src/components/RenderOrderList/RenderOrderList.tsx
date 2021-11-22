import { List, ListProps } from 'antd';
import { useContext } from 'react';

import { InspectionData } from 'src/common/inspection';
import { InspectionContext, InspectionContextUpdater } from 'src/contexts/InspectionContext';
import { GroupSelector } from './GroupSelector';

import scss from './RenderOrderList.module.scss';

export function RenderList() {
    const { data, groups, selectedGroup } = useContext(InspectionContext);
    const { toggleGroup } = useContext(InspectionContextUpdater);

    const showGroupSelector = groups.length > 1;

    const togglePrev = () => toggleGroup('prev');
    const toggleNext = () => toggleGroup('next');

    const renderItem: PickProp<ListProps<InspectionData>, 'renderItem'> = (item) => <List.Item>{item.name}</List.Item>;

    return (
        <div className={scss.root}>
            <div className={scss.header}>
                <span className={scss.title}>Render Order</span>
                {showGroupSelector && (
                    <GroupSelector group={selectedGroup!} toggleNext={toggleNext} togglePrev={togglePrev} />
                )}
            </div>
            <List
                className={scss.list}
                dataSource={selectedGroup ? data[selectedGroup].records : undefined}
                renderItem={renderItem}
                size="small"
            />
        </div>
    );
}
