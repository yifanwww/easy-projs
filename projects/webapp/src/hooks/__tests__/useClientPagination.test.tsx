import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import type { ClientPagination } from 'src/types/app.js';

import { useClientPagination } from '../useClientPagination.js';

describe(`Test react hook \`${useClientPagination.name}\``, () => {
    function Wrapper({ children }: React.PropsWithChildren) {
        return (
            <MemoryRouter initialEntries={['/search?page=2&page_size=15']}>
                <Routes>
                    <Route path="search" element={children} />
                </Routes>
            </MemoryRouter>
        );
    }

    it('should read and write the client pagination', () => {
        const { result } = renderHook(useClientPagination, { wrapper: Wrapper });
        expect(result.current[0]).toStrictEqual({ page: 2, pageSize: 15 });

        act(() => {
            result.current[1]({ page: 3 });
        });
        expect(result.current[0]).toStrictEqual({ page: 3, pageSize: undefined });

        act(() => {
            result.current[1]({ pageSize: 20 });
        });
        expect(result.current[0]).toStrictEqual({ page: undefined, pageSize: 20 });

        act(() => {
            result.current[1]({ page: 1 });
            result.current[1]({ pageSize: 10 });
        });
        expect(result.current[0]).toStrictEqual({ page: undefined, pageSize: 10 });
    });

    it('should update the client pagination (functional updates)', () => {
        const { result } = renderHook(useClientPagination, { wrapper: Wrapper });
        expect(result.current[0]).toStrictEqual({ page: 2, pageSize: 15 });

        act(() => {
            result.current[1]((prev): ClientPagination => ({ page: prev.page! + 1 }));
        });
        expect(result.current[0]).toStrictEqual({ page: 3, pageSize: undefined });

        act(() => {
            result.current[1]((prev): ClientPagination => ({ ...prev, pageSize: 20 }));
        });
        expect(result.current[0]).toStrictEqual({ page: 3, pageSize: 20 });

        act(() => {
            result.current[1]((prev): ClientPagination => ({ ...prev, pageSize: 30 }));
            result.current[1]((prev): ClientPagination => ({ ...prev, page: 10 }));
        });
        expect(result.current[0]).toStrictEqual({ page: 10, pageSize: 30 });
    });
});
