import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { ClientPagination } from 'src/types/app';

enum ClientPaginationKey {
    PAGE = 'page',
    PAGE_SIZE = 'page_size',
}

function getClientPagination(usp: URLSearchParams): ClientPagination {
    const page = usp.get(ClientPaginationKey.PAGE);
    const pageSize = usp.get(ClientPaginationKey.PAGE_SIZE);
    return {
        page: page !== null ? Number(page) : undefined,
        pageSize: pageSize !== null ? Number(pageSize) : undefined,
    };
}

export function mutateClientPagination(
    usp: URLSearchParams,
    value: ClientPagination | ((prev: ClientPagination) => ClientPagination),
) {
    const { page, pageSize } = typeof value === 'function' ? value(getClientPagination(usp)) : value;

    if (page !== undefined) {
        usp.set(ClientPaginationKey.PAGE, page.toString());
    } else {
        usp.delete(ClientPaginationKey.PAGE);
    }

    if (pageSize !== undefined) {
        usp.set(ClientPaginationKey.PAGE_SIZE, pageSize.toString());
    } else {
        usp.delete(ClientPaginationKey.PAGE_SIZE);
    }
}

type SetClientPagination = (value: ClientPagination | ((prev: ClientPagination) => ClientPagination)) => void;

export function useClientPagination(): [ClientPagination, SetClientPagination] {
    const [searchParams, setSearchParams] = useSearchParams();

    const clientPagination = useMemo(() => getClientPagination(searchParams), [searchParams]);

    const setPagination = useCallback<SetClientPagination>(
        (value) => {
            setSearchParams((prev) => {
                mutateClientPagination(prev, value);
                return prev;
            });
        },
        [setSearchParams],
    );

    return [clientPagination, setPagination];
}
