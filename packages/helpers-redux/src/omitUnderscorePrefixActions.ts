import type { UnknownFn, OmitUnderscorePrefix } from '@easy-pkg/types';

import type { ReduxActions } from './types.js';

export function omitUnderscorePrefixActions<T extends ReduxActions>(internalActions: T): OmitUnderscorePrefix<T> {
    const actions: Record<string, UnknownFn> = {};

    for (const key in internalActions) {
        if (!key.startsWith('_')) actions[key] = internalActions[key];
    }

    return actions as OmitUnderscorePrefix<T>;
}
