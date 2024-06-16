import { describe, expect, it, jest } from '@jest/globals';

import { fetcherFactory } from '../fetcherFactory.js';

describe(`Test fn \`${fetcherFactory.name}\``, () => {
    it('should fetch correct url', async () => {
        const fetcher = fetcherFactory({ baseURL: '/apis' });

        let url: string | undefined;

        jest.spyOn(global, 'fetch').mockImplementation((_url) => {
            url = _url as string;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher<Record<string, never>>('/search');
        expect(url).toBe('/apis/search');
    });
});
