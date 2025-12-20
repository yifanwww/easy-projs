import { Button } from 'antd';
import { useNavigate } from 'react-router';

import { RoutePath } from 'src/router/path';

import css from './IntroOverview.module.scss';

interface IntroEntryProps {
    href: string;
}

function IntroEntry({ children, href }: React.PropsWithChildren<IntroEntryProps>) {
    const navigate = useNavigate();

    return (
        <Button size="large" onClick={() => navigate(href)} className={css.entry}>
            {children}
        </Button>
    );
}

export function IntroOverview() {
    return (
        <div className={css.overview}>
            <IntroEntry href={RoutePath.INTRO_ANTD_FORM_APPENDABLE_LIST}>FormAppendableList</IntroEntry>
            <IntroEntry href={RoutePath.INTRO_ANTD_FORM_APPENDABLE_TABLE}>FormAppendableTable</IntroEntry>
            <IntroEntry href={RoutePath.INTRO_ANTD_READONLYABLE}>Readonlyable</IntroEntry>
        </div>
    );
}
