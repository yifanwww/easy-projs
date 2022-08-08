import { useMatch } from 'react-router';

import { RoutePath } from 'src/router';

export function useRouterNum(): Optional<number> {
    const match = useMatch(RoutePath.RoutePageDetail);

    if (match === null) return null;

    const num = Number.parseInt(match.params.num!, 10);

    return Number.isNaN(num) ? null : num;
}
