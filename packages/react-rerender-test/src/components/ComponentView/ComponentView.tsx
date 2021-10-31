import { useRenderCount } from 'src/hooks/useRenderCount';

import scss from './ComponentView.module.scss';

export interface IComponentViewProps extends IChildrenProps {
    /**
     * Background color.
     */
    color: string;
    name: string;
    onRenderChildren?: () => React.ReactNode;
}

export function ComponentView(props: Readonly<IComponentViewProps>): React.ReactElement {
    const { children, color, name, onRenderChildren } = props;

    const renderCount = useRenderCount();

    return (
        <div className={scss.root} style={{ background: color }}>
            <div className={scss.info}>
                <span>{name}</span>
                <span>render count: {renderCount}</span>
            </div>
            {onRenderChildren ? onRenderChildren() : children}
        </div>
    );
}
