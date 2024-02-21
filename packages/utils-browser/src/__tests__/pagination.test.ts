import { describe, expect, it } from '@jest/globals';

import { UspKey, getPaginationUsp, updatePaginationUsp } from '../pagination.js';

describe(`Test fn \`${getPaginationUsp.name}\``, () => {
    it('should update pagination search params', () => {
        {
            const usp = new URLSearchParams();
            expect(getPaginationUsp(usp)).toStrictEqual({ page: undefined, pageSize: undefined });
        }

        {
            const usp = new URLSearchParams([[UspKey.PAGE, '1']]);
            expect(getPaginationUsp(usp)).toStrictEqual({ page: 1, pageSize: undefined });
        }

        {
            const usp = new URLSearchParams([[UspKey.PAGE_SIZE, '10']]);
            expect(getPaginationUsp(usp)).toStrictEqual({ page: undefined, pageSize: 10 });
        }

        {
            const usp = new URLSearchParams([
                [UspKey.PAGE, '1'],
                [UspKey.PAGE_SIZE, '10'],
            ]);
            expect(getPaginationUsp(usp)).toStrictEqual({ page: 1, pageSize: 10 });
        }
    });
});

describe(`Test fn \`${updatePaginationUsp.name}\``, () => {
    it('should update pagination search params', () => {
        {
            const usp = new URLSearchParams();
            updatePaginationUsp(usp, {});
            expect(usp.getAll(UspKey.PAGE)).toStrictEqual([]);
            expect(usp.getAll(UspKey.PAGE_SIZE)).toStrictEqual([]);
        }

        {
            const usp = new URLSearchParams();
            updatePaginationUsp(usp, { page: 1 });
            expect(usp.getAll(UspKey.PAGE)).toStrictEqual(['1']);
            expect(usp.getAll(UspKey.PAGE_SIZE)).toStrictEqual([]);
        }

        {
            const usp = new URLSearchParams();
            updatePaginationUsp(usp, { pageSize: 10 });
            expect(usp.getAll(UspKey.PAGE)).toStrictEqual([]);
            expect(usp.getAll(UspKey.PAGE_SIZE)).toStrictEqual(['10']);
        }

        {
            const usp = new URLSearchParams();
            updatePaginationUsp(usp, { page: 1, pageSize: 10 });
            expect(usp.getAll(UspKey.PAGE)).toStrictEqual(['1']);
            expect(usp.getAll(UspKey.PAGE_SIZE)).toStrictEqual(['10']);
        }
    });
});
