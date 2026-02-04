import { RoutePath } from 'src/router/path';

export const FormAppendableListDescription =
    'Dynamic form list with flexible add/remove functionality and various configuration options';
export const FormAppendableTableDescription =
    'Dynamic table component with flexible row management and advanced customization options';
export const ReadonlyableDescription =
    'Wrapper component for easily toggling read-only state on child components with a clean API';

interface IIntroConfig {
    label: string;
    path: string;
    description: string;
}

export const IntroConfigs: IIntroConfig[] = [
    {
        label: 'FormAppendableList',
        path: RoutePath.INTRO_ANTD_FORM_APPENDABLE_LIST,
        description: FormAppendableListDescription,
    },
    {
        label: 'FormAppendableTable',
        path: RoutePath.INTRO_ANTD_FORM_APPENDABLE_TABLE,
        description: FormAppendableTableDescription,
    },
    {
        label: 'Readonlyable',
        path: RoutePath.INTRO_ANTD_READONLYABLE,
        description: ReadonlyableDescription,
    },
];
