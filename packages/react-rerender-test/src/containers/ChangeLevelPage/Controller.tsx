import { Button } from 'antd';
import { useContext } from 'react';

import { RenderContext, RenderContextUpdater } from 'src/contexts/RenderContext';

export const Controller: React.FC = () => {
    const { selected } = useContext(RenderContext);
    const { select } = useContext(RenderContextUpdater);

    return (
        <Button onClick={() => select(selected === 0 ? 1 : 0)} type="primary">
            Change Level
        </Button>
    );
};
