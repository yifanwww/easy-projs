import css from './DemoGrid.module.css';

interface Demo {
    title: string;
    description: string;
    component: React.ComponentType;
}

interface DemoGridProps {
    demos: Demo[];
}

export function DemoGrid({ demos }: DemoGridProps) {
    return (
        <div className={css.demos}>
            {demos.map((demo) => {
                const DemoComponent = demo.component;
                return (
                    <section key={demo.title} className={css.demoSection}>
                        <div className={css.demoHeader}>
                            <h2 className={css.demoTitle}>{demo.title}</h2>
                            <p className={css.demoDescription}>{demo.description}</p>
                        </div>
                        <div className={css.demoContent}>
                            <DemoComponent />
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
