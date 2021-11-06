import { Layout } from 'antd';

import { InspectionProvider } from 'src/contexts/InspectionContext';
import { RenderProvider } from 'src/contexts/RenderContext';

import { Inspector } from '../Inspection';
import { Note } from '../Note';
import { RenderList } from '../RenderList';

import scss from './TestPage.module.scss';

export interface IPageContainerProps extends IChildrenProps {
    onRenderController?: () => React.ReactNode;
}

export function TestPage(props: IPageContainerProps): React.ReactElement {
    const { children, onRenderController } = props;

    return (
        <Layout.Content className={scss.root}>
            <InspectionProvider>
                <div className={scss.view}>
                    <div className={scss.components}>
                        <RenderProvider>
                            <Inspector>{children}</Inspector>
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
