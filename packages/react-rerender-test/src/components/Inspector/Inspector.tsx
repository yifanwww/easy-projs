import { InspectedFC } from 'src/common/inspection';

export const inspectorName = 'Inspector';

export const Inspector: InspectedFC = (props) => <>{props.children}</>;
Inspector.displayName = inspectorName;
Inspector.inspected = inspectorName;
