import { describe, expect, it } from '@jest/globals';

import { buildQueryURL } from '../url.js';

describe(`Test fn \`${buildQueryURL.name}\``, () => {
    it('should build a url', () => {
        expect(buildQueryURL('/search')).toBe('/search');
        expect(buildQueryURL('/search?')).toBe('/search?');
        expect(buildQueryURL('/search?key=a-specific-key')).toBe('/search?key=a-specific-key');
    });

    it('should build a url with params', () => {
        expect(buildQueryURL('/search', {})).toBe('/search');
        expect(buildQueryURL('/search', { a: 1, b: true, c: false, d: '', e: undefined, f: 'f' })).toBe(
            '/search?a=1&b=true&c=false&d=&f=f',
        );

        expect(buildQueryURL('/search', [])).toBe('/search');
        expect(
            buildQueryURL('/search', [
                ['a', 1],
                ['a', 1],
                ['a', 1],
                ['b', true],
                ['c', false],
                ['d', ''],
                ['e', undefined],
                ['f', 'f'],
            ]),
        ).toBe('/search?a=1&a=1&a=1&b=true&c=false&d=&f=f');

        expect(buildQueryURL('/search', '')).toBe('/search');
        expect(buildQueryURL('/search', 'a=1&b=true&c=false&d=&f=f')).toBe('/search?a=1&b=true&c=false&d=&f=f');

        expect(buildQueryURL('/search', new URLSearchParams())).toBe('/search');
        expect(
            buildQueryURL(
                '/search',
                new URLSearchParams([
                    ['a', '1'],
                    ['a', '1'],
                    ['a', '1'],
                    ['b', 'true'],
                    ['c', 'false'],
                    ['d', ''],
                    ['f', 'f'],
                ]),
            ),
        ).toBe('/search?a=1&a=1&a=1&b=true&c=false&d=&f=f');

        expect(buildQueryURL('/search?', { key: 'key-2' })).toBe('/search?&key=key-2');
        expect(buildQueryURL('/search?key=key-1', { key: 'key-2' })).toBe('/search?key=key-1&key=key-2');
    });
});
