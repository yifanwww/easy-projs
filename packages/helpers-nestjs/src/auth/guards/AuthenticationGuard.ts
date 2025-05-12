import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import assert from 'node:assert';

import { AUTH_ACCESS_TOKEN_KEY } from '../constants.js';
import type { JwtUserPayload } from '../types/jwt.js';
import type { AttachedJwtUserPayload } from '../types/request.js';

import { NO_AUTHENTICATION, USER_PROPERTY_KEY } from './constants.js';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const noAuthentication = this.reflector.getAllAndOverride<boolean | undefined>(NO_AUTHENTICATION, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (noAuthentication) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request & AttachedJwtUserPayload>();
        const typedCookies = request.cookies as Record<string, string | undefined>;
        const accessToken = typedCookies[AUTH_ACCESS_TOKEN_KEY];
        if (!accessToken) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync<JwtUserPayload>(accessToken, {
                secret: process.env.SERVER_JWT_SECRET,
            });
            // We're assigning the payload to the request object here so that we can access it in our route handlers
            request[USER_PROPERTY_KEY] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}

export function NoAuthentication() {
    return SetMetadata(NO_AUTHENTICATION, true);
}

export function getJwtUserPayload(request: Request & AttachedJwtUserPayload): JwtUserPayload {
    assert(request[USER_PROPERTY_KEY] !== undefined);
    return request[USER_PROPERTY_KEY];
}
