import { DemoGrid } from 'src/intro/components/DemoGrid';
import { PageHeader } from 'src/intro/components/PageHeader';
import { IntroConfigs } from 'src/intro/config';
import { BasicDemo } from './BasicDemo';

import css from './ReadonlyableIntro.module.css';

const DEMOS = [
    {
        title: 'Basic',
        description: 'Toggle between read-only and editable states for any component',
        component: BasicDemo,
    },
];

export function ReadonlyableIntro() {
    return (
        <div className={css.container}>
            <PageHeader title="Readonlyable" subtitle={IntroConfigs.Readonlyable.description} />
            <DemoGrid demos={DEMOS} />
        </div>
    );
}
