import { Button } from 'antd';
import { useContext } from 'react';

import { RenderContextUpdater } from 'src/contexts/RenderContext';

export function Controller(): React.ReactElement {
    const { forceUpdate } = useContext(RenderContextUpdater);

    return (
        <Button onClick={forceUpdate} type="primary">
            Force Update
        </Button>
    );
}
