import { DemoGrid } from 'src/intro/components/DemoGrid';
import { PageHeader } from 'src/intro/components/PageHeader';
import { FormAppendableListDescription } from 'src/intro/config';
import { BasicDemo } from './BasicDemo';
import { BigItemDemo } from './BigItemDemo';
import { CountLimitDemo } from './CountLimitDemo';
import { CustomizeActionButtonDemo } from './CustomizeActionButtonDemo';
import { DisabledDemo } from './DisabledDemo';
import { ExtraItemsDemo } from './ExtraItemsDemo';
import { MultiInputsDemo } from './MultiInputsDemo';
import { ReadonlyDemo } from './ReadonlyDemo';
import { TaggedInputDemo } from './TaggedInputDemo';

import css from './FormAppendableListIntro.module.css';

const DEMOS = [
    { title: 'Basic', description: 'Simple list with default add/remove actions', component: BasicDemo },
    { title: 'Multi Inputs', description: 'List items with multiple input fields', component: MultiInputsDemo },
    { title: 'Tagged Input', description: 'List with tag-based input fields', component: TaggedInputDemo },
    { title: 'Disabled', description: 'Disabled state preventing modifications', component: DisabledDemo },
    { title: 'Readonly', description: 'Read-only list with no action buttons', component: ReadonlyDemo },
    { title: 'Extra Items', description: 'List with additional custom items', component: ExtraItemsDemo },
    { title: 'Count Limit', description: 'List with maximum item count restriction', component: CountLimitDemo },
    { title: 'Big Item', description: 'List with larger item components', component: BigItemDemo },
    {
        title: 'Customize Action Button',
        description: 'Custom action buttons for add/remove',
        component: CustomizeActionButtonDemo,
    },
];

export function FormAppendableListIntro() {
    return (
        <div className={css.container}>
            <PageHeader title="FormAppendableList" subtitle={FormAppendableListDescription} />
            <DemoGrid demos={DEMOS} />
        </div>
    );
}
