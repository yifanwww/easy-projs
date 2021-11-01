import { inspectorName } from 'src/common/inspection';

export const Inspector: React.FC = (props) => <>{props.children}</>;
Inspector.displayName = inspectorName;
