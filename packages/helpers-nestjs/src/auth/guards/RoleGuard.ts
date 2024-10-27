import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

import { checkUserRole, UserRole } from '../role.js';

import { getJwtUserPayload } from './AuthenticationGuard.js';
import { NO_AUTHENTICATION } from './constants.js';

const REQUIRED_ROLE = 'REQUIRED_ROLE';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const noAuthentication = this.reflector.getAllAndOverride<boolean | undefined>(NO_AUTHENTICATION, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (noAuthentication) {
            return true;
        }

        const requiredRole =
            this.reflector.getAllAndOverride<UserRole | undefined>(REQUIRED_ROLE, [
                context.getHandler(),
                context.getClass(),
            ]) ?? UserRole.ROOT; // by default we only allow ROOT role

        const request = context.switchToHttp().getRequest<Request>();
        const user = getJwtUserPayload(request);
        if (!user) {
            return false;
        }

        return checkUserRole(user.role, requiredRole);
    }
}

export function RequireRole(role: UserRole) {
    return SetMetadata(REQUIRED_ROLE, role);
}
