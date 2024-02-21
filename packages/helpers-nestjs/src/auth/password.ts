import crypto from 'node:crypto';

// reference: https://datatracker.ietf.org/doc/html/rfc8018#section-4
const SALT_BYTES = 128 / 8;
const HASH_BYTES = 256 / 8;
// reference: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#pbkdf2
const ITERATIONS = 210_000;
const DIGEST = 'sha512';

export function hashPassword(password: string) {
    const salt = crypto.randomBytes(SALT_BYTES).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, HASH_BYTES, DIGEST).toString('hex');
    return salt + hash;
}

export function verifyPassword(password: string, combined: string) {
    const salt = combined.slice(0, SALT_BYTES * 2);
    const originalHash = combined.slice(SALT_BYTES * 2);
    const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, HASH_BYTES, DIGEST).toString('hex');
    return hash === originalHash;
}
