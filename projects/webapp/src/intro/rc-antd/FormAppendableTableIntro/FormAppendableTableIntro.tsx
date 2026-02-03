import { DemoGrid } from 'src/intro/components/DemoGrid';
import { PageHeader } from 'src/intro/components/PageHeader';
import { IntroConfigs } from 'src/intro/config';
import { BasicDemo } from './BasicDemo';
import { BorderedDemo } from './BorderedDemo';
import { ComplexTableDemo } from './ComplexTableDemo';
import { CountLimitDemo } from './CountLimitDemo';
import { CustomizeActionButtonDemo } from './CustomizeActionButtonDemo';
import { CustomizeAddButtonTextDemo } from './CustomizeAddButtonTextDemo';
import { DisabledDemo } from './DisabledDemo';
import { ReadonlyDemo } from './ReadonlyDemo';
import { SizeDemo } from './SizeDemo';

import css from './FormAppendableTableIntro.module.css';

const DEMOS = [
    { title: 'Basic', description: 'Simple table with default add/remove actions', component: BasicDemo },
    { title: 'Bordered', description: 'Table with borders around cells', component: BorderedDemo },
    { title: 'Disabled', description: 'Disabled state preventing modifications', component: DisabledDemo },
    { title: 'Readonly', description: 'Read-only table with no action buttons', component: ReadonlyDemo },
    { title: 'Size', description: 'Different size variations for table layout', component: SizeDemo },
    { title: 'Count Limit', description: 'Table with maximum row count restriction', component: CountLimitDemo },
    {
        title: 'Customize Add Button Text',
        description: 'Custom text for the add button',
        component: CustomizeAddButtonTextDemo,
    },
    {
        title: 'Customize Action Button',
        description: 'Custom action buttons for add/remove',
        component: CustomizeActionButtonDemo,
    },
    {
        title: 'Complex Table',
        description: 'Advanced table with multiple columns and validations',
        component: ComplexTableDemo,
    },
];

export function FormAppendableTableIntro() {
    return (
        <div className={css.container}>
            <PageHeader title="FormAppendableTable" subtitle={IntroConfigs.FormAppendableTable.description} />
            <DemoGrid demos={DEMOS} />
        </div>
    );
}
