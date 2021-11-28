import clsx from 'clsx';

import scss from './InputWrapper.module.scss';

export interface IInputWrapperProps extends ReactChildrenProps {
    className?: string;
    flexAuto?: boolean;
    title?: string;
}

export function InputWrapper(props: IInputWrapperProps): React.ReactElement {
    const { children, className, flexAuto, title } = props;
    return (
        <div className={clsx(scss.root, flexAuto && scss.auto, className)}>
            <div className={scss.title}>{title}</div>
            {children}
        </div>
    );
}
