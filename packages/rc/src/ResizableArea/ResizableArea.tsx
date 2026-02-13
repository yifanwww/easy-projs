import clsx from 'clsx';
import { forwardRef } from 'react';

import css from './ResizableArea.module.scss';

interface ResizableAreaProps {
    className?: string;
    max?: number;
    min?: number;
    style?: React.CSSProperties;
    vertical?: boolean;
}

export const ResizableArea = forwardRef<HTMLDivElement, React.PropsWithChildren<ResizableAreaProps>>((props, ref) => {
    const { children, className, max, min, style, vertical } = props;
    return (
        <div
            ref={ref}
            className={clsx(
                css['resizable-area'],
                vertical ? css['resizable-area-vertical'] : css['resizable-area-horizontal'],
                className,
            )}
            style={{
                maxWidth: vertical ? undefined : max,
                minWidth: vertical ? undefined : min,
                maxHeight: vertical ? max : undefined,
                minHeight: vertical ? min : undefined,
                ...style,
            }}
        >
            {children}
        </div>
    );
});
