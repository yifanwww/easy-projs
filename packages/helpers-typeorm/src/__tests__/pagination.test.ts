import { describe, expect, it } from '@jest/globals';

import { convertServerPagination, convertApiPagination } from '../pagination.js';

describe(`Test fn \`${convertServerPagination.name}\``, () => {
    it('convert pagination request body', () => {
        expect(convertServerPagination({})).toStrictEqual({ skip: undefined, take: undefined });
        expect(convertServerPagination({ page: undefined, pageSize: undefined })).toStrictEqual({
            skip: undefined,
            take: undefined,
        });

        expect(convertServerPagination({ page: 1, pageSize: undefined })).toStrictEqual({
            skip: undefined,
            take: undefined,
        });
        expect(convertServerPagination({ page: undefined, pageSize: 10 })).toStrictEqual({ skip: 0, take: 10 });

        expect(convertServerPagination({ page: 1, pageSize: 10 })).toStrictEqual({ skip: 0, take: 10 });
        expect(convertServerPagination({ page: 10, pageSize: 10 })).toStrictEqual({ skip: 90, take: 10 });
    });
});

describe(`Test fn \`${convertApiPagination.name}\``, () => {
    it('convert pagination request body', () => {
        expect(convertApiPagination({})).toStrictEqual({ skip: undefined, take: undefined });
        expect(convertApiPagination({ page: undefined, page_size: undefined })).toStrictEqual({
            skip: undefined,
            take: undefined,
        });

        expect(convertApiPagination({ page: 1, page_size: undefined })).toStrictEqual({
            skip: undefined,
            take: undefined,
        });
        expect(convertApiPagination({ page: undefined, page_size: 10 })).toStrictEqual({ skip: 0, take: 10 });

        expect(convertApiPagination({ page: 1, page_size: 10 })).toStrictEqual({ skip: 0, take: 10 });
        expect(convertApiPagination({ page: 10, page_size: 10 })).toStrictEqual({ skip: 90, take: 10 });
    });
});
