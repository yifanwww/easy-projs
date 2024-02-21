import { UspUtil } from './usp.js';

export enum UspKey {
    PAGE = 'page',
    PAGE_SIZE = 'page_size',
}

export interface PaginationUsp {
    page?: number;
    pageSize?: number;
}

export function getPaginationUsp(usp: URLSearchParams): PaginationUsp {
    const page = usp.get(UspKey.PAGE);
    const pageSize = usp.get(UspKey.PAGE_SIZE);
    return {
        page: page !== null ? Number(page) : undefined,
        pageSize: pageSize !== null ? Number(pageSize) : undefined,
    };
}

export function updatePaginationUsp(usp: URLSearchParams, pagination: PaginationUsp): URLSearchParams {
    const { page, pageSize } = pagination;
    UspUtil.set(usp, UspKey.PAGE, page?.toString());
    UspUtil.set(usp, UspKey.PAGE_SIZE, pageSize?.toString());
    return usp;
}
