import clsx from 'clsx';

import css from './InputWrapper.module.scss';

interface InputWrapperProps {
    className?: string;
    flexAuto?: boolean;
    title?: string;
}

export function InputWrapper(props: React.PropsWithChildren<InputWrapperProps>): JSX.Element {
    const { children, className, flexAuto, title } = props;
    return (
        <div className={clsx(css.layout, flexAuto && css.auto, className)}>
            <div className={css.title}>{title}</div>
            {children}
        </div>
    );
}
