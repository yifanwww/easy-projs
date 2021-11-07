import { useContext } from 'react';

import { InspectedFC } from 'src/common/inspection';
import { InspectionContextUpdater } from 'src/contexts/InspectionContext';
import { useInspectorPosition } from 'src/hooks/useInspectorPosition';

export const inspectorName = 'Inspector';

export interface IInspectorProps {
    /**
     * Default is `default`.
     */
    group?: string;
}

export const Inspector: InspectedFC<IInspectorProps> = (props) => {
    const { children, group = 'default' } = props;

    const { registerGroup } = useContext(InspectionContextUpdater);

    const index = useInspectorPosition();

    registerGroup(group, index);

    return <>{children}</>;
};
Inspector.displayName = inspectorName;
Inspector.inspected = inspectorName;
