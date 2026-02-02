import { DemoLayout } from '../../components/DemoLayout';
import { BasicDemo } from './BasicDemo';
import { BorderedDemo } from './BorderedDemo';
import { ComplexTableDemo } from './ComplexTableDemo';
import { CountLimitDemo } from './CountLimitDemo';
import { CustomizeActionButtonDemo } from './CustomizeActionButtonDemo';
import { CustomizeAddButtonTextDemo } from './CustomizeAddButtonTextDemo';
import { DisabledDemo } from './DisabledDemo';
import { ReadonlyDemo } from './ReadableDemo';
import { SizeDemo } from './SizeDemo';

export function FormAppendableTableIntro() {
    return (
        <DemoLayout>
            <h1>FormAppendableTable</h1>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <BasicDemo />

            <h3>Bordered</h3>
            <BorderedDemo />

            <h3>Disabled</h3>
            <DisabledDemo />

            <h3>Readonly</h3>
            <ReadonlyDemo />

            <h3>Size</h3>
            <SizeDemo />

            <h3>Count Limit</h3>
            <CountLimitDemo />

            <h3>Customize Add Button Text</h3>
            <CustomizeAddButtonTextDemo />

            <h3>Customize Action Button</h3>
            <CustomizeActionButtonDemo />

            <h3>Complex Table</h3>
            <ComplexTableDemo />
        </DemoLayout>
    );
}
