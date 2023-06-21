import { Tag } from 'antd';

import type { InspectedFCType } from 'src/common/inspection';
import { useRenderCount } from 'src/hooks';

import css from './ComponentView.module.scss';

interface ComponentTagProps {
    type: InspectedFCType;
}

function ComponentTag({ type }: ComponentTagProps): JSX.Element | null {
    let never: never;
    switch (type) {
        case 'nil':
            return null;
        case 'prc':
            return (
                <Tag className={css.tag} color="green">
                    <span>prc</span>
                </Tag>
            );
        case 'ptc':
            return (
                <Tag className={css.tag} color="blue">
                    <span>ptc</span>
                </Tag>
            );

        /* istanbul ignore next */
        default:
            never = type;
            return never;
    }
}

interface ComponentViewProps {
    /**
     * Background color.
     */
    color?: string;
    desc?: string;
    name: string;
    type?: InspectedFCType;
}

export function ComponentView(props: React.PropsWithChildren<ComponentViewProps>): JSX.Element {
    const { children, color, desc, name, type = 'nil' } = props;

    const renderCount = useRenderCount();

    return (
        <div className={css.root} style={{ background: color }}>
            <div className={css.info}>
                <span className={css.title}>
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
}
