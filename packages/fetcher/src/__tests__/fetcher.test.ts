import { assert } from '@easy-pkg/utils-browser';
import { describe, expect, it, jest } from '@jest/globals';
import { ErrAsync, OkAsync } from 'rustlike-result';

import { fetcherFactory } from '../fetcherFactory.js';

const fetcher = fetcherFactory();

describe(`Test fn \`${fetcher.name}\``, () => {
    // Request

    it('should fetch correct url', async () => {
        let url: string | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_url) => {
            url = _url as string;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher<Record<string, never>>('/search');
        expect(url).toBe('/search');

        await fetcher<Record<string, never>>('search');
        expect(url).toBe('/search');

        await fetcher<Record<string, never>>('/search', { params: { key: 'a-key' } });
        expect(url).toBe('/search?key=a-key');
    });

    it('should pass headers when fetching', async () => {
        let headers: Record<string, string> | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_, options) => {
            headers = options?.headers as Record<string, string> | undefined;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher<Record<string, never>>('/search');
        expect(headers).toStrictEqual({});

        await fetcher<Record<string, never>>('/search', { method: 'POST', data: { key: 'a-key' } });
        expect(headers).toStrictEqual({
            'content-type': 'application/json; charset=utf-8',
        });

        await fetcher<Record<string, never>>('/search', { method: 'POST', headers: { authorization: 'auth' } });
        expect(headers).toStrictEqual({
            authorization: 'auth',
        });
    });

    // Response

    it(`should return ${OkAsync.name} containing response`, async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response('{}')));

        const result = await fetcher<Record<string, never>>('/search', { method: 'GET' });
        expect(result.isOk()).toBe(true);
        const resp = result.unwrapUnchecked();

        expect(resp.data).toStrictEqual({});
        expect(resp.status).toBe(200);
    });

    it(`should return ${ErrAsync.name} containing error response`, async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response('{}', { status: 400 })));

        const result = await fetcher<Record<string, never>, Record<string, never>>('/search', { method: 'GET' });
        expect(result.isErr()).toBe(true);
        const resp = result.unwrapErrUnchecked();

        assert(!(resp instanceof TypeError));
        expect(resp.data).toStrictEqual({});
        expect(resp.status).toBe(400);
    });

    it(`should return ${ErrAsync.name} containing TypeError`, async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => {
            throw new TypeError('Failed to fetch');
        });

        const result = await fetcher<Record<string, never>, Record<string, never>>('/search', { method: 'GET' });
        expect(result.isErr()).toBe(true);
        const resp = result.unwrapErrUnchecked();

        expect(resp).toBeInstanceOf(TypeError);
        assert(resp instanceof TypeError);
        expect(resp.message).toBe('Failed to fetch');
    });
});

describe(`Test fn \`${fetcher.name}.get\``, () => {
    it('should call fetch (method=GET)', async () => {
        let method: string | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_, options) => {
            method = options?.method;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher.get('/search');
        expect(method).toBe('GET');
    });
});

describe(`Test fn \`${fetcher.name}.head\``, () => {
    it('should call fetch (method=HEAD)', async () => {
        let method: string | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_, options) => {
            method = options?.method;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher.head('/search');
        expect(method).toBe('HEAD');
    });
});

describe(`Test fn \`${fetcher.name}.options\``, () => {
    it('should call fetch (method=OPTIONS)', async () => {
        let method: string | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_, options) => {
            method = options?.method;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher.options('/search');
        expect(method).toBe('OPTIONS');
    });
});

describe(`Test fn \`${fetcher.name}.post\``, () => {
    it('should call fetch (method=POST)', async () => {
        let method: string | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_, options) => {
            method = options?.method;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher.post('/search');
        expect(method).toBe('POST');
    });
});

describe(`Test fn \`${fetcher.name}.delete\``, () => {
    it('should call fetch (method=DELETE)', async () => {
        let method: string | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_, options) => {
            method = options?.method;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher.delete('/search');
        expect(method).toBe('DELETE');
    });
});

describe(`Test fn \`${fetcher.name}.put\``, () => {
    it('should call fetch (method=PUT)', async () => {
        let method: string | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_, options) => {
            method = options?.method;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher.put('/search');
        expect(method).toBe('PUT');
    });
});

describe(`Test fn \`${fetcher.name}.patch\``, () => {
    it('should call fetch (method=PATCH)', async () => {
        let method: string | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_, options) => {
            method = options?.method;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher.patch('/search');
        expect(method).toBe('PATCH');
    });
});
