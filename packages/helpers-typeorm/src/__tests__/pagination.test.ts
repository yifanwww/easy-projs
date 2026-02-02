import { describe, expect, it } from '@jest/globals';
import { convertPagination, convertServerPagination } from '../pagination.js';

describe(`Test fn \`${convertPagination.name}\``, () => {
    it('convert pagination request body', () => {
        expect(convertPagination()).toStrictEqual({ skip: undefined, take: undefined });
        expect(convertPagination(undefined, undefined)).toStrictEqual({
            skip: undefined,
            take: undefined,
        });

        expect(convertPagination(1)).toStrictEqual({ skip: undefined, take: undefined });
        expect(convertPagination(undefined, 10)).toStrictEqual({ skip: 0, take: 10 });

        expect(convertPagination(1, 10)).toStrictEqual({ skip: 0, take: 10 });
        expect(convertPagination(10, 10)).toStrictEqual({ skip: 90, take: 10 });
    });
});

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
