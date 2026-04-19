import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { ClientPagination } from 'src/types/app';

const PAGE_KEY = 'page';
const PAGE_SIZE_KEY = 'page_size';

function getClientPagination(usp: URLSearchParams, fallbackPage: number, fallbackPageSize: number): ClientPagination {
    const page = usp.get(PAGE_KEY);
    const pageSize = usp.get(PAGE_SIZE_KEY);
    return {
        page: page !== null ? Number(page) : fallbackPage,
        pageSize: pageSize !== null ? Number(pageSize) : fallbackPageSize,
    };
}

type SetClientPagination = (
    value: Partial<ClientPagination> | ((prev: ClientPagination) => Partial<ClientPagination>),
) => void;

export function createUseClientPagination(initialPage: number, initialPageSize: number) {
    function mutateClientPagination(
        usp: URLSearchParams,
        value: Partial<ClientPagination> | ((prev: ClientPagination) => Partial<ClientPagination>),
    ) {
        const { page, pageSize } =
            typeof value === 'function' ? value(getClientPagination(usp, initialPage, initialPageSize)) : value;

        if (page !== undefined) {
            usp.set(PAGE_KEY, page.toString());
        } else {
            usp.delete(PAGE_KEY);
        }

        if (pageSize !== undefined) {
            usp.set(PAGE_SIZE_KEY, pageSize.toString());
        } else {
            usp.delete(PAGE_SIZE_KEY);
        }
    }

    function useClientPagination(): [Partial<ClientPagination>, SetClientPagination] {
        const [searchParams, setSearchParams] = useSearchParams();

        const clientPagination = useMemo(
            () => getClientPagination(searchParams, initialPage, initialPageSize),
            [searchParams],
        );

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

    return { mutateClientPagination, useClientPagination };
}

export const { mutateClientPagination, useClientPagination } = createUseClientPagination(1, 10);
