import clsx from 'clsx';
import { useContext } from 'react';

import { InspectedFC } from 'src/common/inspection';
import { InspectionContext, InspectionContextUpdater } from 'src/contexts/InspectionContext';
import { useInspectorPosition } from 'src/hooks/useInspectorPosition';

import scss from './Inspector.module.scss';

export const inspectorName = 'Inspector';

export interface InspectorProps {
    /**
     * Default is `default`.
     */
    group?: string;
}

export const Inspector: InspectedFC<InspectorProps> = (props) => {
    const { children, group = 'default' } = props;

    const { groups, selectedGroup } = useContext(InspectionContext);
    const { registerGroup } = useContext(InspectionContextUpdater);

    const hasMultiGroups = groups.length > 1;

    const index = useInspectorPosition();

    registerGroup(group, index);

    return (
        <div className={scss.root}>
            {hasMultiGroups && <span className={scss.group}>Group: {group}</span>}
            <div className={clsx(selectedGroup === group && hasMultiGroups && scss.highlight)}>{children}</div>
        </div>
    );
};
Inspector.displayName = inspectorName;
Inspector.inspected = inspectorName;
