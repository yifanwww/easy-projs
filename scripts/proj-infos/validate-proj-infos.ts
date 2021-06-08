import { ProjInfoJson, ProjType } from './types';
import { hasProperties, hasProperty, isNormalObject, isPropertiesCount, match } from './validate';

function validatePropClean(clean: any[]): clean is string[] {
    for (const v of clean) {
        if (typeof v !== 'string') return false;
    }
    return true;
}

const validatePropType = (type: string): type is ProjType => match(type, Object.values(ProjType));

const validatePropPort = (port: number): boolean => Number.isInteger(port) && port >= 1024 && port <= 65535;

export function validateProjInfoJson(json: any): json is ProjInfoJson {
    if (!isNormalObject(json) || !isPropertiesCount(json, [5, 6, 7])) return false;
    if (!hasProperties(json, ['name', 'output', 'startup', 'type'] as const, 'string')) return false;
    if (!hasProperty(json, 'clean', 'array')) return false;

    if (!validatePropClean(json.clean)) return false;
    if (!validatePropType(json.type)) return false;

    if (isPropertiesCount(json, 6)) {
        if (hasProperty(json, 'port', 'number')) {
            return validatePropPort(json.port);
        } else if (hasProperty(json, 'template', 'boolean')) {
            return true;
        } else {
            return false;
        }
    }

    if (isPropertiesCount(json, 7)) {
        if (!hasProperty(json, 'port', 'number')) return false;
        if (!validatePropPort(json.port)) return false;
        if (!hasProperty(json, 'template', 'boolean')) return false;
    }

    return true;
}
