/*
 * This is the global history object, use this instead of create your own.
 * This way we only create one history object and avoid possible circular imports.
 */

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
