import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useSearchParams } from 'react-router-dom';

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

    it('should read and update the client pagination', () => {
        const { result } = renderHook(useClientPagination, { wrapper: Wrapper });
        expect(result.current[0]).toStrictEqual({ page: 2, pageSize: 15 });

        act(() => {
            result.current[1].setPagination({ page: 3 });
        });
        expect(result.current[0]).toStrictEqual({ page: 3, pageSize: undefined });

        act(() => {
            result.current[1].setPagination({ pageSize: 20 });
        });
        expect(result.current[0]).toStrictEqual({ page: undefined, pageSize: 20 });

        act(() => {
            result.current[1].setPagination({ page: 1 });
            result.current[1].setPagination({ pageSize: 10 });
        });
        expect(result.current[0]).toStrictEqual({ page: undefined, pageSize: 10 });
    });

    it('should update the client pagination (functional updates)', () => {
        const { result } = renderHook(useClientPagination, { wrapper: Wrapper });
        expect(result.current[0]).toStrictEqual({ page: 2, pageSize: 15 });

        act(() => {
            result.current[1].setPagination((prev): ClientPagination => ({ page: prev.page! + 1 }));
        });
        expect(result.current[0]).toStrictEqual({ page: 3, pageSize: undefined });

        act(() => {
            result.current[1].setPagination((prev): ClientPagination => ({ ...prev, pageSize: 20 }));
        });
        expect(result.current[0]).toStrictEqual({ page: 3, pageSize: 20 });

        act(() => {
            result.current[1].setPagination((prev): ClientPagination => ({ ...prev, pageSize: 30 }));
            result.current[1].setPagination((prev): ClientPagination => ({ ...prev, page: 10 }));
        });
        expect(result.current[0]).toStrictEqual({ page: 10, pageSize: 30 });
    });

    it('should update the client pagination by setSearchParams', () => {
        const { result } = renderHook(
            () => ({
                searchParams: useSearchParams(),
                pagination: useClientPagination(),
            }),
            { wrapper: Wrapper },
        );
        expect(result.current.pagination[0]).toStrictEqual({ page: 2, pageSize: 15 });

        act(() => {
            result.current.searchParams[1]((prev) => {
                result.current.pagination[1].mutatePagination(prev, { page: 3 });
                return prev;
            });
        });
        expect(result.current.pagination[0]).toStrictEqual({ page: 3, pageSize: undefined });

        act(() => {
            result.current.searchParams[1]((prev) => {
                result.current.pagination[1].mutatePagination(prev, { pageSize: 20 });
                return prev;
            });
        });
        expect(result.current.pagination[0]).toStrictEqual({ page: undefined, pageSize: 20 });

        act(() => {
            result.current.searchParams[1]((prev) => {
                result.current.pagination[1].mutatePagination(prev, { page: 1 });
                result.current.pagination[1].mutatePagination(prev, { pageSize: 10 });
                return prev;
            });
        });
        expect(result.current.pagination[0]).toStrictEqual({ page: undefined, pageSize: 10 });
    });

    it('should update the client pagination by setSearchParams (functional updates)', () => {
        const { result } = renderHook(
            () => ({
                searchParams: useSearchParams(),
                pagination: useClientPagination(),
            }),
            { wrapper: Wrapper },
        );
        expect(result.current.pagination[0]).toStrictEqual({ page: 2, pageSize: 15 });

        act(() => {
            result.current.searchParams[1]((prev) => {
                result.current.pagination[1].mutatePagination(prev, (_prev) => ({ page: _prev.page! + 1 }));
                return prev;
            });
        });
        expect(result.current.pagination[0]).toStrictEqual({ page: 3, pageSize: undefined });

        act(() => {
            result.current.searchParams[1]((prev) => {
                result.current.pagination[1].mutatePagination(prev, (_prev) => ({ ..._prev, pageSize: 20 }));
                return prev;
            });
        });
        expect(result.current.pagination[0]).toStrictEqual({ page: 3, pageSize: 20 });

        act(() => {
            result.current.searchParams[1]((prev) => {
                result.current.pagination[1].mutatePagination(prev, (_prev) => ({ ..._prev, pageSize: 30 }));
                result.current.pagination[1].mutatePagination(prev, (_prev) => ({ ..._prev, page: 10 }));
                return prev;
            });
        });
        expect(result.current.pagination[0]).toStrictEqual({ page: 10, pageSize: 30 });
    });
});
