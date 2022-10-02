import type { OmitUnderscorePrefix } from '@easy-pkg/utils-type';

import type { ReduxActions } from './types';

export function omitUnderscorePrefixActions<T extends ReduxActions>(internalActions: T): OmitUnderscorePrefix<T> {
    const actions: Record<string, Function> = {};

    for (const key in internalActions) {
        if (!key.startsWith('_')) actions[key] = internalActions[key];
    }

    return actions as OmitUnderscorePrefix<T>;
}
