import { assert } from '@easy-pkg/utils';
import { useMatch } from 'react-router';

import { RoutePath } from 'src/routes';

export function useRouterNum(): number {
    const match = useMatch(RoutePath.ROUTE_DETAIL);

    assert(match !== null);
    assert(match.params.num !== undefined);

    const num = Number.parseInt(match.params.num, 10);

    assert(Number.isNaN(num));

    return num;
}
