import { List, ListProps } from 'antd';
import { useContext } from 'react';

import { IInspectionData, InspectionContext } from 'src/utils/inspection';

import scss from './RenderList.module.scss';

export function RenderList() {
    const { records } = useContext(InspectionContext);

    const renderItem: PickProp<ListProps<IInspectionData>, 'renderItem'> = (item) => {
        return <List.Item>{item.name}</List.Item>;
    };

    return <List className={scss.root} dataSource={records} renderItem={renderItem} size="small" />;
}
