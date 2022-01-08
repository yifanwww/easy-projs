import clsx from 'clsx';

import scss from './InputWrapper.module.scss';

export interface IInputWrapperProps {
    className?: string;
    flexAuto?: boolean;
    title?: string;
}

export const InputWrapper: React.FC<IInputWrapperProps> = (props) => {
    const { children, className, flexAuto, title } = props;
    return (
        <div className={clsx(scss.root, flexAuto && scss.auto, className)}>
            <div className={scss.title}>{title}</div>
            {children}
        </div>
    );
};
