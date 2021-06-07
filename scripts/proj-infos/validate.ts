export const isBigint = (value: any): value is bigint => typeof value === 'bigint';

export const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

export const isNull = (value: any): value is null => value === null;

export const isNumber = (value: any): value is Number => typeof value === 'number';

export const isString = (value: any): value is string => typeof value === 'string';

export const isUndefined = (value: any): value is undefined => value === undefined;

export const isArray = (value: any): value is any[] => Array.isArray(value);

export const isNormalObject = (value: any): value is {} =>
    !isNull(value) && typeof value === 'object' && !isArray(value);

export const isNumberOrUndefined = (value: any): value is number | undefined => isNumber(value) || isUndefined(value);

export const isPropertiesCount = (obj: {}, allow: number | number[]): boolean =>
    typeof allow === 'number' ? allow === Object.keys(obj).length : allow.includes(Object.keys(obj).length);

type Combine<O extends {}, P extends string | readonly string[], V> = P extends string
    ? O & { [p in P]: V }
    : O & { [p in P[number]]: V };

type PropertyType = 'any' | 'array' | 'bigint' | 'boolean' | 'null' | 'number' | 'string' | 'undefined' | '{}';
type PropertyTypeToType<T extends PropertyType> = T extends 'any'
    ? any
    : T extends 'array'
    ? any[]
    : T extends 'bigint'
    ? bigint
    : T extends 'boolean'
    ? boolean
    : T extends 'null'
    ? null
    : T extends 'number'
    ? number
    : T extends 'string'
    ? string
    : T extends 'undefined'
    ? undefined
    : T extends '{}'
    ? {}
    : never;

const _hasProperty = <O extends {}, P extends string>(obj: O, prop: P): obj is Combine<O, P, any> => prop in obj;

export function hasProperty<O extends {}, P extends string, T extends PropertyType = 'any'>(
    obj: O,
    prop: P,
    type?: T,
): obj is Combine<O, P, PropertyTypeToType<T>> {
    if (!_hasProperty(obj, prop)) return false;

    const test = obj[prop];
    const _type = (type || 'any') as PropertyType;

    let never: never;
    switch (_type) {
        case 'any':
            return true;
        case 'array':
            return isArray(test);
        case 'bigint':
            return isBigint(test);
        case 'boolean':
            return isBoolean(test);
        case 'null':
            return isNull(test);
        case 'number':
            return isNumber(test);
        case 'string':
            return isString(test);
        case 'undefined':
            return isUndefined(test);
        case '{}':
            return isNormalObject(test);

        default:
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            never = _type;
            return false;
    }
}

function validateProperties<O extends {}, P extends string, T extends PropertyType>(
    obj: O,
    props: readonly P[],
    type: T,
    validate: (obj: O, prop: P, type: T) => boolean,
): boolean {
    for (const prop of props) {
        if (!validate(obj, prop, type)) return false;
    }
    return true;
}

export const hasProperties = <O, P extends readonly string[], T extends PropertyType = 'any'>(
    obj: O,
    props: P,
    type: T,
): obj is Combine<O, P, PropertyTypeToType<T>> => validateProperties(obj, props, type, hasProperty);

export const match = <T extends any>(value: any, matches: T[]): value is T => matches.includes(value);
