import { Tag } from 'antd';

import { InspectedFCType } from 'src/common/inspection';
import { useRenderCount } from 'src/hooks';

import scss from './ComponentView.module.scss';

interface ComponentTagProps {
    type: InspectedFCType;
}

const ComponentTag: React.FC<ComponentTagProps> = ({ type }) => {
    let never: never;
    switch (type) {
        case 'nil':
            return null;
        case 'prc':
            return (
                <Tag className={scss.tag} color="green">
                    <span>prc</span>
                </Tag>
            );
        case 'ptc':
            return (
                <Tag className={scss.tag} color="blue">
                    <span>ptc</span>
                </Tag>
            );

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = type;
            return null;
    }
};

export interface ComponentViewProps {
    /**
     * Background color.
     */
    color?: string;
    desc?: string;
    name: string;
    type?: InspectedFCType;
}

export const ComponentView: React.FC<ComponentViewProps> = (props) => {
    const { children, color, desc, name, type = 'nil' } = props;

    const renderCount = useRenderCount();

    return (
        <div className={scss.root} style={{ background: color }}>
            <div className={scss.info}>
                <span className={scss.title}>
                    {name}
                    <ComponentTag type={type} />
                </span>
                <span>render count: {renderCount}</span>
                <span style={{ height: '8px' }} />
                <span>{desc}</span>
            </div>
            {children}
        </div>
    );
};
