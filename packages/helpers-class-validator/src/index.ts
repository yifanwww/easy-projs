import type { ValidationOptions } from 'class-validator';
import { ValidateIf } from 'class-validator';

export function IsNullable(options?: ValidationOptions): PropertyDecorator {
    return ValidateIf((obj, value) => value !== null, options);
}

export function IsUndefinable(options?: ValidationOptions): PropertyDecorator {
    return ValidateIf((obj, value) => value !== undefined, options);
}

export function IsEmptyStringIgnorable(options?: ValidationOptions): PropertyDecorator {
    return ValidateIf((obj, value) => value !== '', options);
}
