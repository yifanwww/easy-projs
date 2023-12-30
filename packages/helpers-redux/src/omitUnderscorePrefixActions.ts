import type { UnknownFn } from '@easy-pkg/types/fn';
import type { OmitUnderscorePrefix } from '@easy-pkg/types/utils';

import type { ReduxActions } from './types';

export function omitUnderscorePrefixActions<T extends ReduxActions>(internalActions: T): OmitUnderscorePrefix<T> {
    const actions: Record<string, UnknownFn> = {};

    for (const key in internalActions) {
        if (!key.startsWith('_')) actions[key] = internalActions[key];
    }

    return actions as OmitUnderscorePrefix<T>;
}
