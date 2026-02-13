import { DemoGrid } from 'src/intro/components/DemoGrid';
import { DemoPage } from 'src/intro/components/DemoPage';
import { ReadonlyableDescription } from 'src/intro/config';
import { BasicDemo } from './BasicDemo';

const DEMOS = [
    {
        title: 'Basic',
        description: 'Toggle between read-only and editable states for any component',
        component: BasicDemo,
    },
];

export function ReadonlyableIntro() {
    return (
        <DemoPage title="Readonlyable" subtitle={ReadonlyableDescription}>
            <DemoGrid demos={DEMOS} />
        </DemoPage>
    );
}
