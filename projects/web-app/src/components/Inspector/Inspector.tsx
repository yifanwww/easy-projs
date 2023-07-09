import clsx from 'clsx';
import { useContext } from 'react';

import { InspectionContext, InspectionContextUpdater } from 'src/contexts/InspectionContext';
import { useInspectorPosition } from 'src/hooks';
import type { InspectedFC } from 'src/types/inspection';

import css from './Inspector.module.scss';

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
        <div className={css.layout}>
            {hasMultiGroups && <span className={css.group}>Group: {group}</span>}
            <div className={clsx(selectedGroup === group && hasMultiGroups && css.highlight)}>{children}</div>
        </div>
    );
};
Inspector.displayName = inspectorName;
Inspector.inspected = inspectorName;
