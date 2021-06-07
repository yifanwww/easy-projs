import { ProjInfoJson, ProjType } from './types';
import { hasProperties, hasProperty, isNormalObject, isPropertiesCount, match } from './validate';

function validatePropClean(clean: any[]): clean is string[] {
    for (const v of clean) {
        if (typeof v !== 'string') return false;
    }
    return true;
}

const validatePropPort = (port: number): boolean => port >= 1024 && port <= 65535;

const validatePropType = (type: string): type is ProjType => match(type, Object.values(ProjType));

function validatePropProjInfo(info: {}): info is ProjInfoJson['projInfo'] {
    if (!isNormalObject(info) || !isPropertiesCount(info, [5, 6])) return false;
    if (!hasProperties(info, ['name', 'output', 'startup', 'type'] as const, 'string')) return false;
    if (!hasProperty(info, 'clean', 'array')) return false;

    if (!validatePropClean(info.clean)) return false;
    if (!validatePropType(info.type)) return false;

    if (isPropertiesCount(info, 6)) {
        if (!hasProperty(info, 'port', 'number')) return false;
        if (!validatePropPort(info.port)) return false;
    }

    return true;
}

export function validateProjInfoJson(json: any): json is ProjInfoJson {
    if (!isNormalObject(json) || !isPropertiesCount(json, 1)) return false;
    if (!hasProperty(json, 'projInfo', '{}')) return false;

    return validatePropProjInfo(json.projInfo);
}
