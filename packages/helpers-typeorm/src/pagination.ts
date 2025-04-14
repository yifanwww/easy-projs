export interface ServerPagination {
    page?: number;
    pageSize?: number;
}

interface PaginationOptions {
    skip?: number;
    take?: number;
}

export function convertPagination(page?: number, pageSize?: number): PaginationOptions {
    return !pageSize
        ? { skip: undefined, take: undefined }
        : { skip: Math.max((page ?? 1) - 1, 0) * pageSize, take: pageSize };
}

export function convertServerPagination(pagination?: ServerPagination): PaginationOptions {
    return convertPagination(pagination?.page, pagination?.pageSize);
}
