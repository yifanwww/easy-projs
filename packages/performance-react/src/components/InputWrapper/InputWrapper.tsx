import clsx from 'clsx';

import scss from './InputWrapper.module.scss';

export interface IInputWrapperProps extends ReactChildrenProps {
    flexAuto?: boolean;
    title?: string;
}

export function InputWrapper(props: IInputWrapperProps): React.ReactElement {
    const { children, flexAuto, title } = props;
    return (
        <div className={clsx(scss.root, flexAuto && scss.auto)}>
            <div className={scss.title}>{title}</div>
            {children}
        </div>
    );
}
