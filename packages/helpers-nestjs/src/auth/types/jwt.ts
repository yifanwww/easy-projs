import type { UserRole } from '../role.js';

export interface JwtSignPayload {
    id: number;
    username: string;
    role: UserRole;
}

export interface JwtUserPayload extends JwtSignPayload {
    iat: number;
    exp: number;
}
