import { useRenderCount } from 'src/hooks';

import scss from './ComponentView.module.scss';

export interface IComponentViewProps extends IChildrenProps {
    /**
     * Background color.
     */
    color: string;
    name: string;
}

export function ComponentView(props: Readonly<IComponentViewProps>): React.ReactElement {
    const { children, color, name } = props;

    const renderCount = useRenderCount();

    return (
        <div className={scss.root} style={{ background: color }}>
            <div className={scss.info}>
                <span className={scss.name}>{name}</span>
                <span>render count: {renderCount}</span>
            </div>
            {children}
        </div>
    );
}
