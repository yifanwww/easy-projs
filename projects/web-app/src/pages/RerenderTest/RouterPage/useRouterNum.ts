import { assertIsString } from '@easy-pkg/utils-browser';
import { useMatch } from 'react-router';

import { RoutePath } from 'src/routes';

export function useRouterNum(): number | null {
    const match = useMatch(RoutePath.RERENDER_TEST_ROUTE_DETAIL);

    if (match === null) return null;

    assertIsString(match.params.num, 'match.params.num');

    const num = Number.parseInt(match.params.num, 10);

    return Number.isNaN(num) ? null : num;
}
