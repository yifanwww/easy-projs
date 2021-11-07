import { Button } from 'antd';
import { generatePath, useNavigate } from 'react-router';

import { RoutePath } from 'src/common/route';

import { useRouterNum } from './useRouterNum';

export function Controller(): React.ReactElement {
    const path = RoutePath.RoutePageDetail;

    const navigate = useNavigate();

    const num = useRouterNum()!;

    return (
        <div style={{ display: 'flex', gap: '24px' }}>
            <Button onClick={() => navigate(generatePath(path, { num: `${((num + 3) % 5) + 1}` }))} type="primary">
                Prev Route
            </Button>
            <Button onClick={() => navigate(generatePath(path, { num: `${(num % 5) + 1}` }))} type="primary">
                Next Route
            </Button>
        </div>
    );
}
