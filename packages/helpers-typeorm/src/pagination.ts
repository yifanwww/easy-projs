import { type ApiPagination } from '@easy-pkg/apis';

export interface ServerPagination {
    page?: number;
    pageSize?: number;
}

interface PaginationOptions {
    skip?: number;
    take?: number;
}

export function convertServerPagination(req: ServerPagination): PaginationOptions {
    const { page, pageSize } = req;
    return !pageSize
        ? { skip: undefined, take: undefined }
        : { skip: Math.max((page ?? 1) - 1, 0) * pageSize, take: pageSize };
}

export function convertApiPagination(req: ApiPagination): PaginationOptions {
    return convertServerPagination({ page: req.page, pageSize: req.page_size });
}
