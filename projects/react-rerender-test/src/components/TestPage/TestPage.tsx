import { Layout } from 'antd';

import { InspectionProvider } from 'src/contexts/InspectionContext';
import { RenderProvider } from 'src/contexts/RenderContext';

import { Note } from '../Note';
import { RenderOrderList } from '../RenderOrderList';

import css from './TestPage.module.scss';

interface TestPageProps {
    onRenderController?: () => React.ReactNode;
}

export function TestPage({ children, onRenderController }: React.PropsWithChildren<TestPageProps>): JSX.Element {
    return (
        <Layout.Content className={css.root}>
            <InspectionProvider>
                <div className={css.view}>
                    <div className={css.components}>
                        <RenderProvider>
                            {children}
                            {onRenderController?.()}
                        </RenderProvider>
                    </div>
                    <Note />
                </div>
                <RenderOrderList />
            </InspectionProvider>
        </Layout.Content>
    );
}
