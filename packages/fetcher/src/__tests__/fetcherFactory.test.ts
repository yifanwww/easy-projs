import { describe, expect, it, jest } from '@jest/globals';
import { fetcherFactory } from '../fetcherFactory.js';

describe(`Test fn \`${fetcherFactory.name}\``, () => {
    it('should fetch correct url', async () => {
        const fetcher = fetcherFactory({ baseURL: '/apis' });

        let url: string | undefined;

        jest.spyOn(window, 'fetch').mockImplementation((_url) => {
            url = _url as string;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher<Record<string, never>>('/search');
        expect(url).toBe('/apis/search');
    });

    it('should fetch correct url (different domain)', async () => {
        const fetcher = fetcherFactory({ baseURL: 'https://www.test.com/apis' });

        let url: string | undefined;

        jest.spyOn(window, 'fetch').mockImplementation((_url) => {
            url = _url as string;
            return Promise.resolve(new Response('{}'));
        });

        await fetcher<Record<string, never>>('/search');
        expect(url).toBe('https://www.test.com/apis/search');
    });
});
