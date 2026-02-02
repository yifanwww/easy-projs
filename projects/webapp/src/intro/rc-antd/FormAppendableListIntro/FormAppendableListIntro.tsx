import { DemoLayout } from '../../components/DemoLayout';
import { BasicDemo } from './BasicDemo';
import { BigItemDemo } from './BigItemDemo';
import { CountLimitDemo } from './CountLimitDemo';
import { CustomizeActionButtonDemo } from './CustomizeActionButtonDemo';
import { DisabledDemo } from './DisabledDemo';
import { ExtraItemsDemo } from './ExtraItemsDemo';
import { MultiInputsDemo } from './MultiInputsDemo';
import { ReadonlyDemo } from './ReadonlyDemo';
import { TaggedInputDemo } from './TaggedInputDemo';

export function FormAppendableListIntro() {
    return (
        <DemoLayout>
            <h1>FormAppendableList</h1>
            <h2>Examples</h2>

            <h3>Basic</h3>
            <BasicDemo />

            <h3>Multi Inputs</h3>
            <MultiInputsDemo />

            <h3>Tagged Input</h3>
            <TaggedInputDemo />

            <h3>Disabled</h3>
            <DisabledDemo />

            <h3>Readonly</h3>
            <ReadonlyDemo />

            <h3>Extra Items</h3>
            <ExtraItemsDemo />

            <h3>Count Limit</h3>
            <CountLimitDemo />

            <h3>Big Item</h3>
            <BigItemDemo />

            <h3>Customize Action Button</h3>
            <CustomizeActionButtonDemo />
        </DemoLayout>
    );
}
