import crypto from 'node:crypto';

export function createEnvHash(env: NodeJS.ProcessEnv) {
    const hash = crypto.createHash('md5');
    hash.update(JSON.stringify(env));
    return hash.digest('hex');
}
