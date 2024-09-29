import { describe, expect, it } from '@jest/globals';

import { UserRole, UserRoleHelper } from '../role.js';

describe(`Test static method \`${UserRoleHelper.name}.${UserRoleHelper.satisify.name}\``, () => {
    it('should check if current role satisify required role', () => {
        expect(UserRoleHelper.satisify(UserRole.ROOT, UserRole.ROOT)).toBe(true);
        expect(UserRoleHelper.satisify(UserRole.ADMIN, UserRole.ROOT)).toBe(false);
        expect(UserRoleHelper.satisify(UserRole.USER, UserRole.ROOT)).toBe(false);

        expect(UserRoleHelper.satisify(UserRole.ROOT, UserRole.ADMIN)).toBe(true);
        expect(UserRoleHelper.satisify(UserRole.ADMIN, UserRole.ADMIN)).toBe(true);
        expect(UserRoleHelper.satisify(UserRole.USER, UserRole.ADMIN)).toBe(false);

        expect(UserRoleHelper.satisify(UserRole.ROOT, UserRole.USER)).toBe(true);
        expect(UserRoleHelper.satisify(UserRole.ADMIN, UserRole.USER)).toBe(true);
        expect(UserRoleHelper.satisify(UserRole.USER, UserRole.USER)).toBe(true);
    });
});
