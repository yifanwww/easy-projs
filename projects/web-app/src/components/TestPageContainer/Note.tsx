import css from './Note.module.scss';

export function Note(): React.ReactNode {
    return (
        <div className={css.layout}>
            <span className={css.title}>Note</span>
            <div className={css.textContainer}>
                <code>PRC = Parent Renders Children</code>
                <code>PTC = Pass Through Children</code>
            </div>
        </div>
    );
}
