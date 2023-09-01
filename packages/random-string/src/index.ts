import crypto from 'node:crypto';

export class RandomGenerator {
    private static readonly _chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 \n';
    private static readonly _charbytes = Buffer.from(RandomGenerator._chars, 'ascii');

    string(length: number): string {
        const bytes = crypto.randomBytes(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = RandomGenerator._charbytes[bytes[i] % 64];
        }
        return bytes.toString('ascii');
    }
}
