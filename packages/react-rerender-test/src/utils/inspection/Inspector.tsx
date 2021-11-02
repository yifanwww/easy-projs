import { inspectorName } from 'src/utils/inspection';

export const Inspector: React.FC = (props) => <>{props.children}</>;
Inspector.displayName = inspectorName;
