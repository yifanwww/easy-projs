import type { ValidationOptions } from 'class-validator';
import { ValidateIf } from 'class-validator';

export function isNullable(options?: ValidationOptions): PropertyDecorator {
    return ValidateIf((obj, value) => value !== null, options);
}

export function isUndefinable(options?: ValidationOptions): PropertyDecorator {
    return ValidateIf((obj, value) => value !== undefined, options);
}
