import type { PaginationUsp } from '@easy-pkg/utils-browser';
import { getPaginationUsp } from '@easy-pkg/utils-browser';
import { useMemo } from 'react';

export function usePaginationUsp(usp: URLSearchParams): PaginationUsp {
    return useMemo(() => getPaginationUsp(usp), [usp]);
}
