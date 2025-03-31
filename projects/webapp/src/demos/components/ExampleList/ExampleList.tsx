import clsx from 'clsx';

import css from './ExampleList.module.scss';

interface ExampleListProps {
    vertical?: boolean;
    style?: React.CSSProperties;
}

export function ExampleList({ children, style, vertical }: React.PropsWithChildren<ExampleListProps>) {
    return (
        <div className={clsx(css['example-list'], vertical && css['example-list-vertical'])} style={style}>
            {children}
        </div>
    );
}
