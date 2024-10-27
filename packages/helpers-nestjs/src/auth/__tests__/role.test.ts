import { describe, expect, it } from '@jest/globals';

import { checkUserRole, UserRole } from '../role.js';

describe(`Test fn \`${checkUserRole.name}\``, () => {
    it('should check if current role satisify required role', () => {
        expect(checkUserRole(UserRole.ROOT, UserRole.ROOT)).toBe(true);
        expect(checkUserRole(UserRole.ADMIN, UserRole.ROOT)).toBe(false);
        expect(checkUserRole(UserRole.USER, UserRole.ROOT)).toBe(false);

        expect(checkUserRole(UserRole.ROOT, UserRole.ADMIN)).toBe(true);
        expect(checkUserRole(UserRole.ADMIN, UserRole.ADMIN)).toBe(true);
        expect(checkUserRole(UserRole.USER, UserRole.ADMIN)).toBe(false);

        expect(checkUserRole(UserRole.ROOT, UserRole.USER)).toBe(true);
        expect(checkUserRole(UserRole.ADMIN, UserRole.USER)).toBe(true);
        expect(checkUserRole(UserRole.USER, UserRole.USER)).toBe(true);
    });
});
