import { Button } from 'antd';
import { generatePath, useHistory, useRouteMatch } from 'react-router';
import { RoutePath } from 'src/common/route';

export interface IControllerProps {
    type: 'prc' | 'ptc';
}

export function Controller(props: IControllerProps): React.ReactElement {
    const path = props.type === 'prc' ? RoutePath.PrcRoutePageDetail : RoutePath.PtcRoutePageDetail;

    const history = useHistory();
    const match = useRouteMatch<{ num: string }>(path);
    const num = match?.params.num ? Number.parseInt(match.params.num, 10) : 0;

    return (
        <div style={{ display: 'flex', gap: '24px' }}>
            <Button onClick={() => history.push(generatePath(path, { num: ((num + 3) % 5) + 1 }))} type="primary">
                Prev Route
            </Button>
            <Button onClick={() => history.push(generatePath(path, { num: (num % 5) + 1 }))} type="primary">
                Next Route
            </Button>
        </div>
    );
}
