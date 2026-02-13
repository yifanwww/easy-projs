import { RoutePath } from 'src/router/path';

export const FormAppendableListDescription =
    'Dynamic form list with flexible add/remove functionality and various configuration options';
export const FormAppendableTableDescription =
    'Dynamic table component with flexible row management and advanced customization options';
export const ReadonlyableDescription =
    'Wrapper component for easily toggling read-only state on child components with a clean API';
export const ResizableAreaDescription =
    'A resizable component that can be used to test the responsive behavior of other components';

interface IntroConfig {
    name: string;
    path: string;
    description: string;
    label?: string;
}

export const IntroConfigs: IntroConfig[] = [
    {
        name: 'FormAppendableList',
        path: RoutePath.INTRO_ANTD_FORM_APPENDABLE_LIST,
        description: FormAppendableListDescription,
        label: 'antd',
    },
    {
        name: 'FormAppendableTable',
        path: RoutePath.INTRO_ANTD_FORM_APPENDABLE_TABLE,
        description: FormAppendableTableDescription,
        label: 'antd',
    },
    {
        name: 'Readonlyable',
        path: RoutePath.INTRO_ANTD_READONLYABLE,
        description: ReadonlyableDescription,
        label: 'antd',
    },
    {
        name: 'ResizableArea',
        path: RoutePath.INTRO_RESIZABLE_AREA,
        description: ResizableAreaDescription,
    },
];
