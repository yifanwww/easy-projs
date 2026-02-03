import css from './PageHeader.module.css';

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className={css.header}>
            <h1 className={css.title}>{title}</h1>
            <p className={css.subtitle}>{subtitle}</p>
        </div>
    );
}
