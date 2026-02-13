import css from './DemoPage.module.css';

interface DemoPageProps {
    title: string;
    subtitle: string;
}

export function DemoPage({ title, subtitle, children }: React.PropsWithChildren<DemoPageProps>) {
    return (
        <div className={css.page}>
            <div className={css.header}>
                <h1 className={css.title}>{title}</h1>
                <p className={css.subtitle}>{subtitle}</p>
            </div>
            {children}
        </div>
    );
}
