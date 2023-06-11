/**
 * Returns a URL or a path with slash at the end.
 * In production can be URL, absolute path, relative path
 * In development always will be an absolute path
 */
export function getPublicUrl(isEnvDevelopment: boolean, publicUrl?: string): string {
    if (!publicUrl) return '/';

    const normailzedPublicUrl = publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/`;

    if (!isEnvDevelopment) return normailzedPublicUrl;

    // This is only used to validate the public url
    const stubDomain = 'https://test.dev';
    const validPublicUrl = new URL(normailzedPublicUrl, stubDomain);

    return normailzedPublicUrl.startsWith('.') ? '/' : validPublicUrl.pathname;
}
