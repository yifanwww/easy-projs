import css from './Note.module.scss';

export const Note: React.FC = () => {
    return (
        <div className={css.root}>
            <span className={css.title}>Note</span>
            <div className={css.textContainer}>
                <code>PRC = Parent Renders Children</code>
                <code>PTC = Pass Through Children</code>
            </div>
        </div>
    );
};
