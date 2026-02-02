import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { getJwtUserPayload } from './guards/AuthenticationGuard.js';
import { type AttachedJwtUserPayload } from './types/request.js';

const UserInner = createParamDecorator((data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request & AttachedJwtUserPayload>();
    return getJwtUserPayload(request);
});

export function User(): ParameterDecorator {
    return UserInner();
}
