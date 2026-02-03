import { RoutePath } from 'src/router/path';

export const IntroConfigs = {
    FormAppendableList: {
        label: 'FormAppendableList',
        url: RoutePath.INTRO_ANTD_FORM_APPENDABLE_LIST,
        description: 'Dynamic form list with flexible add/remove functionality and various configuration options',
    },
    FormAppendableTable: {
        label: 'FormAppendableTable',
        url: RoutePath.INTRO_ANTD_FORM_APPENDABLE_TABLE,
        description: 'Dynamic table component with flexible row management and advanced customization options',
    },
    Readonlyable: {
        label: 'Readonlyable',
        url: RoutePath.INTRO_ANTD_READONLYABLE,
        description: 'Wrapper component for easily toggling read-only state on child components with a clean API',
    },
};
