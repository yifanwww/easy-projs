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

type MutateClientPagination = (
    prev: URLSearchParams,
    value: ClientPagination | ((_prev: ClientPagination) => ClientPagination),
) => void;
type SetClientPagination = (value: ClientPagination | ((prev: ClientPagination) => ClientPagination)) => void;

interface ClientPaginationActions {
    mutatePagination: MutateClientPagination;
    setPagination: SetClientPagination;
}

export function useClientPagination(): [ClientPagination, ClientPaginationActions] {
    const [searchParams, setSearchParams] = useSearchParams();

    const clientPagination = useMemo(() => getClientPagination(searchParams), [searchParams]);

    const mutatePagination = useCallback<MutateClientPagination>((prev, value) => {
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
    }, []);

    const setPagination = useCallback<SetClientPagination>(
        (value) => {
            setSearchParams((prev) => {
                mutatePagination(prev, value);
                return prev;
            });
        },
        [mutatePagination, setSearchParams],
    );

    return [clientPagination, { mutatePagination, setPagination }];
}
