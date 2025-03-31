import { Button } from 'antd';
import { useNavigate } from 'react-router';

import { RoutePath } from 'src/router/path';

import css from './ComponentDemoOverview.module.scss';

interface DemoEntryProps {
    href: string;
}

function DemoEntry({ children, href }: React.PropsWithChildren<DemoEntryProps>) {
    const navigate = useNavigate();

    return (
        <Button size="large" onClick={() => navigate(href)} className={css.entry}>
            {children}
        </Button>
    );
}

export function ComponentDemoOverview() {
    return (
        <div className={css.overview}>
            <DemoEntry href={RoutePath.DEMO_ANTD_FORM_APPENDABLE_LIST}>FormAppendableList</DemoEntry>
            <DemoEntry href={RoutePath.DEMO_ANTD_FORM_APPENDABLE_TABLE}>FormAppendableTable</DemoEntry>
            <DemoEntry href={RoutePath.DEMO_ANTD_READONLYABLE}>Readonlyable</DemoEntry>
        </div>
    );
}
