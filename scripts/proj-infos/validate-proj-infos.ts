import { ProjInfoJson, ProjType } from './types';
import { hasProperties, hasProperty, isNormalObject, isPropertiesCount, match } from './validate';

function validatePropClean(clean: any[]): clean is string[] {
    for (const v of clean) {
        if (typeof v !== 'string') return false;
    }
    return true;
}

const validatePropPort = (port: number): boolean => Number.isInteger(port) && port >= 1024 && port <= 65535;

const validatePropType = (type: string): type is ProjType => match(type, Object.values(ProjType));

export function validateProjInfoJson(json: any): json is ProjInfoJson {
    if (!isNormalObject(json) || !isPropertiesCount(json, [5, 6])) return false;
    if (!hasProperties(json, ['name', 'output', 'startup', 'type'] as const, 'string')) return false;
    if (!hasProperty(json, 'clean', 'array')) return false;

    if (!validatePropClean(json.clean)) return false;
    if (!validatePropType(json.type)) return false;

    if (isPropertiesCount(json, 6)) {
        if (!hasProperty(json, 'port', 'number')) return false;
        if (!validatePropPort(json.port)) return false;
    }

    return true;
}
