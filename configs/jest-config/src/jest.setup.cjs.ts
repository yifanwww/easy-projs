declare const window: typeof globalThis;

async function setup() {
    // Make sure we're in a Browser-like environment before importing polyfills
    // This prevents `fetch()` from being imported in a Node test environment
    if (typeof window !== 'undefined') {
        // fetch() polyfill for making API calls.
        await import('whatwg-fetch');
    }

    // https://github.com/remix-run/react-router/issues/12363#issuecomment-2496226528
    if (!globalThis.TextEncoder || !globalThis.TextDecoder) {
        const { TextDecoder, TextEncoder } = await import('node:util');
        globalThis.TextEncoder = TextEncoder;
        globalThis.TextDecoder = TextDecoder;
    }
}

void setup();
