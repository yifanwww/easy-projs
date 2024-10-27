import assert from 'node:assert';

// import your user-role from somewhere
export enum UserRole {
    ROOT,
    ADMIN,
    USER,
}

const ROLE_ORDER = [UserRole.ROOT, UserRole.ADMIN, UserRole.USER];

export function checkUserRole(current: UserRole, required: UserRole) {
    const currentIndex = ROLE_ORDER.indexOf(current);
    const indexOfRequired = ROLE_ORDER.indexOf(required);
    assert(currentIndex !== -1);
    assert(indexOfRequired !== -1);
    return currentIndex <= indexOfRequired;
}
