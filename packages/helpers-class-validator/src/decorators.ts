import type { ValidationOptions } from 'class-validator';
import { ValidateIf } from 'class-validator';

export function IsEmptyStringIgnorable(options?: ValidationOptions): PropertyDecorator {
    return ValidateIf((obj, value) => value !== '', options);
}
