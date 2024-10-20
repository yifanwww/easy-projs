import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

enum ClientPaginationKey {
    PAGE = 'page',
    PAGE_SIZE = 'page_size',
}

export interface ClientPagination {
    page?: number;
    pageSize?: number;
}

function getClientPagination(usp: URLSearchParams): ClientPagination {
    const page = usp.get(ClientPaginationKey.PAGE);
    const pageSize = usp.get(ClientPaginationKey.PAGE_SIZE);
    return {
        page: page !== null ? Number(page) : undefined,
        pageSize: pageSize !== null ? Number(pageSize) : undefined,
    };
}

type SetClientPagination = (value: ClientPagination | ((prev: ClientPagination) => ClientPagination)) => void;

export function useClientPagination(): [ClientPagination, SetClientPagination] {
    const [searchParams, setSearchParams] = useSearchParams();

    const clientPagination = useMemo(() => getClientPagination(searchParams), [searchParams]);

    const setClientPagination = useCallback<SetClientPagination>(
        (value) => {
            setSearchParams((prev) => {
                const { page, pageSize } = typeof value === 'function' ? value(getClientPagination(prev)) : value;

                if (page !== undefined) {
                    prev.set(ClientPaginationKey.PAGE, page.toString());
                } else {
                    prev.delete(ClientPaginationKey.PAGE);
                }

                if (pageSize !== undefined) {
                    prev.set(ClientPaginationKey.PAGE_SIZE, pageSize.toString());
                } else {
                    prev.delete(ClientPaginationKey.PAGE_SIZE);
                }

                return prev;
            });
        },
        [setSearchParams],
    );

    return [clientPagination, setClientPagination];
}
