import { type CanActivate, type ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const EXPERIMENTAL_API = 'EXPERIMENTAL_API';

@Injectable()
export class ExperimentalApiGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const experimentalApi = this.reflector.getAllAndOverride<boolean | undefined>(EXPERIMENTAL_API, [
            context.getHandler(),
            context.getClass(),
        ]);
        return !experimentalApi || __EXPERIMENTAL__;
    }
}

export function ExperimentalApi() {
    return SetMetadata(EXPERIMENTAL_API, true);
}
