import { Tag } from 'antd';
import { match } from 'ts-pattern';

import { useRenderCount } from 'src/hooks';
import type { InspectedFCType } from 'src/types/inspection';

import css from './ComponentView.module.scss';

interface ComponentTagProps {
    type: InspectedFCType;
}

function ComponentTag({ type }: ComponentTagProps): JSX.Element | null {
    return match(type)
        .with('nil', () => null)
        .with('prc', () => (
            <Tag className={css.tag} color="green">
                <span>prc</span>
            </Tag>
        ))
        .with('ptc', () => (
            <Tag className={css.tag} color="blue">
                <span>ptc</span>
            </Tag>
        ))
        .exhaustive();
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
        <div className={css.layout} style={{ background: color }}>
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
