import { type USER_PROPERTY_KEY } from '../guards/constants.js';

import { type JwtUserPayload } from './jwt.js';

export interface AttachedJwtUserPayload {
    [USER_PROPERTY_KEY]?: JwtUserPayload;
}
