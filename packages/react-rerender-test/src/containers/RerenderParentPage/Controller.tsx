import { Button } from 'antd';
import { useContext } from 'react';

import { RenderContextUpdater } from 'src/contexts/RenderContext';

export const Controller: React.FC = () => {
    const { forceUpdate } = useContext(RenderContextUpdater);

    return (
        <Button onClick={forceUpdate} type="primary">
            Force Update
        </Button>
    );
};
