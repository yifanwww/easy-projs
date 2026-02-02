import { DemoLayout } from '../../components/DemoLayout';
import { BasicDemo } from './BasicDemo';

export function ReadonlyableIntro() {
    return (
        <DemoLayout>
            <h1>Readonlyable</h1>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <BasicDemo />
        </DemoLayout>
    );
}
