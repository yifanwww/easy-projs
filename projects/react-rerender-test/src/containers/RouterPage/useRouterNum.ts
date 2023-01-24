import type { Optional } from '@easy-pkg/utils-type';
import { useMatch } from 'react-router';

import { RoutePath } from 'src/routes';

export function useRouterNum(): Optional<number> {
    const match = useMatch(RoutePath.ROUTE_DETAIL);

    if (match === null) return null;

    const num = Number.parseInt(match.params.num!, 10);

    return Number.isNaN(num) ? null : num;
}
