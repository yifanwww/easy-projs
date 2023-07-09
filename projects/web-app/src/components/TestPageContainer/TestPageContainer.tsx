import { Layout } from 'antd';

import { InspectionProvider } from 'src/contexts/InspectionContext';
import { RenderProvider } from 'src/contexts/RenderContext';

import { RenderOrderList } from '../RenderOrderList';

import { Note } from './Note';

import css from './TestPageContainer.module.scss';

interface TestPageContainerProps {
    onRenderController?: () => React.ReactNode;
}

export function TestPageContainer(props: React.PropsWithChildren<TestPageContainerProps>): JSX.Element {
    const { children, onRenderController } = props;

    return (
        <Layout.Content className={css.layout}>
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
