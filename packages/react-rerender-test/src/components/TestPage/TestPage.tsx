import { Layout } from 'antd';

import { InspectionProvider } from 'src/contexts/InspectionContext';
import { RenderProvider } from 'src/contexts/RenderContext';

import { Note } from '../Note';
import { RenderList } from '../RenderOrderList';

import scss from './TestPage.module.scss';

export interface TestPageProps extends ReactChildrenProps {
    onRenderController?: () => React.ReactNode;
}

export function TestPage(props: TestPageProps): React.ReactElement {
    const { children, onRenderController } = props;

    return (
        <Layout.Content className={scss.root}>
            <InspectionProvider>
                <div className={scss.view}>
                    <div className={scss.components}>
                        <RenderProvider>
                            {children}
                            {onRenderController?.()}
                        </RenderProvider>
                    </div>
                    <Note />
                </div>
                <RenderList />
            </InspectionProvider>
        </Layout.Content>
    );
}
