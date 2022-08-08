import scss from './Note.module.scss';

export const Note: React.FC = () => {
    return (
        <div className={scss.root}>
            <span className={scss.title}>Note</span>
            <div className={scss.textContainer}>
                <code>PRC = Parent Renders Children</code>
                <code>PTC = Pass Through Children</code>
            </div>
        </div>
    );
};
