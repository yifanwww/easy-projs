import clsx from 'clsx';

import css from './InputWrapper.module.scss';

export interface IInputWrapperProps {
    className?: string;
    flexAuto?: boolean;
    title?: string;
}

export const InputWrapper: React.FC<IInputWrapperProps> = (props) => {
    const { children, className, flexAuto, title } = props;
    return (
        <div className={clsx(css.root, flexAuto && css.auto, className)}>
            <div className={css.title}>{title}</div>
            {children}
        </div>
    );
};
