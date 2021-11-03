import { Layout } from 'antd';

import { RenderProvider } from 'src/contexts/RenderContext';
import { InspectionProvider, Inspector } from 'src/utils/inspection';

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
                    <RenderProvider>
                        <Inspector>{children}</Inspector>
                        {onRenderController?.()}
                    </RenderProvider>
                </div>
                <RenderList />
            </InspectionProvider>
        </Layout.Content>
    );
}
