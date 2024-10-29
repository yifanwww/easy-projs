import type { ClassConstructor } from 'class-transformer';

/**
 * This factory is only used for unit test.
 */
export function dtoFactory<T extends object>(cls: ClassConstructor<object>, plain: T) {
    // eslint-disable-next-line new-cap
    const model = new cls();
    Object.assign(model, plain);
    return model;
}
