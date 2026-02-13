import { DemoGrid } from 'src/intro/components/DemoGrid';
import { DemoPage } from 'src/intro/components/DemoPage';
import { ResizableAreaDescription } from 'src/intro/config';
import { BasicDemo } from './BasicDemo';
import { MinMaxRangeDemo } from './MinMaxRangeDemo';

const DEMOS = [
    { title: 'Basic', description: 'horizontally or vertically resizable', component: BasicDemo },
    { title: 'Min-Max Range', description: 'resizable in a limited range', component: MinMaxRangeDemo },
];

export function ResizableAreaIntro() {
    return (
        <DemoPage title="ResizableArea" subtitle={ResizableAreaDescription}>
            <DemoGrid demos={DEMOS} />
        </DemoPage>
    );
}
