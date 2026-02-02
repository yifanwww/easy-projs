import crypto from 'node:crypto';
import { describe, expect, it, jest } from '@jest/globals';
import { hashPassword, verifyPassword } from '../password.js';

describe(`Test fn \`${hashPassword.name}\``, () => {
    it('should return hash password', () => {
        jest.spyOn(crypto, 'randomBytes').mockImplementation((size) => {
            const buffer = Buffer.alloc(size);
            for (let i = 0; i < size; i++) {
                buffer.fill(i, i);
            }
            return buffer;
        });

        expect(hashPassword('test')).toBe(
            '000102030405060708090a0b0c0d0e0f816288a51f2a2960cb4228d84f74a8e50a879fe853b06b477c4510e7a7e0c3d6',
        );
    });
});

describe(`Test fn \`${verifyPassword.name}\``, () => {
    it('should return hash password', () => {
        jest.spyOn(crypto, 'randomBytes').mockImplementation((size) => {
            const buffer = Buffer.alloc(size);
            for (let i = 0; i < size; i++) {
                buffer.fill(i, i);
            }
            return buffer;
        });

        expect(
            verifyPassword(
                'test',
                '000102030405060708090a0b0c0d0e0f816288a51f2a2960cb4228d84f74a8e50a879fe853b06b477c4510e7a7e0c3d6',
            ),
        ).toBe(true);

        expect(
            verifyPassword(
                'test',
                '00000000000000000000000000000000816288a51f2a2960cb4228d84f74a8e50a879fe853b06b477c4510e7a7e0c3d6',
            ),
        ).toBe(false);

        expect(
            verifyPassword(
                'test',
                '000102030405060708090a0b0c0d0e0f0000000000000000000000000000000000000000000000000000000000000000',
            ),
        ).toBe(false);
    });
});
