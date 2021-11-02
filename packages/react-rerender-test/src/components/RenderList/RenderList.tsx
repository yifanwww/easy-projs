import { List, ListProps } from 'antd';
import { useContext } from 'react';

import { IInspectionRecord, InspectionContext } from 'src/utils/inspection';

import scss from './RenderList.module.scss';

export function RenderList() {
    const { records } = useContext(InspectionContext);

    const renderItem: PickProp<ListProps<IInspectionRecord>, 'renderItem'> = (item) => {
        return <List.Item>{item.name}</List.Item>;
    };

    return <List className={scss.root} dataSource={records} renderItem={renderItem} size="small" />;
}
