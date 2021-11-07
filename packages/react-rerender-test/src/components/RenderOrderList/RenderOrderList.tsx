import { List, ListProps } from 'antd';
import { useContext, useEffect, useState } from 'react';

import { IInspectionData } from 'src/common/inspection';
import { InspectionContext } from 'src/contexts/InspectionContext';
import { GroupSelector } from './GroupSelector';

import scss from './RenderOrderList.module.scss';

export function RenderList() {
    const { data, groups } = useContext(InspectionContext);

    const [group, setGroup] = useState<string>();

    useEffect(() => {
        if (group === undefined && groups.length > 0) {
            setGroup(groups[0]);
        }
    }, [group, groups]);

    const isMultiLists = groups.length > 1;

    const togglePrev = () => {
        const index = groups.indexOf(group!);
        setGroup(groups[(index + groups.length - 1) % groups.length]);
    };

    const toggleNext = () => {
        const index = groups.indexOf(group!);
        setGroup(groups[(index + 1) % groups.length]);
    };

    const renderItem: PickProp<ListProps<IInspectionData>, 'renderItem'> = (item) => <List.Item>{item.name}</List.Item>;

    console.log(data);

    return (
        <div className={scss.root}>
            <div className={scss.header}>
                <span className={scss.title}>Render Order</span>
                {isMultiLists && <GroupSelector group={group!} toggleNext={toggleNext} togglePrev={togglePrev} />}
            </div>
            <List
                className={scss.list}
                dataSource={group ? data[group].records : undefined}
                renderItem={renderItem}
                size="small"
            />
        </div>
    );
}
