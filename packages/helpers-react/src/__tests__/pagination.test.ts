import { UspKey } from '@easy-pkg/utils-browser';
import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { usePaginationUsp } from '../pagination.js';

describe(`Test react hook \`${usePaginationUsp.name}\``, () => {
    it('should return pagination search params from USP', () => {
        {
            const usp = new URLSearchParams();
            const { result } = renderHook(() => usePaginationUsp(usp));
            expect(result.current).toStrictEqual({ page: undefined, pageSize: undefined });
        }

        {
            const usp = new URLSearchParams([[UspKey.PAGE, '1']]);
            const { result } = renderHook(() => usePaginationUsp(usp));
            expect(result.current).toStrictEqual({ page: 1, pageSize: undefined });
        }

        {
            const usp = new URLSearchParams([[UspKey.PAGE_SIZE, '10']]);
            const { result } = renderHook(() => usePaginationUsp(usp));
            expect(result.current).toStrictEqual({ page: undefined, pageSize: 10 });
        }

        {
            const usp = new URLSearchParams([
                [UspKey.PAGE, '1'],
                [UspKey.PAGE_SIZE, '10'],
            ]);
            const { result } = renderHook(() => usePaginationUsp(usp));
            expect(result.current).toStrictEqual({ page: 1, pageSize: 10 });
        }
    });
});
