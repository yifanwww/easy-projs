import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import fs from 'node:fs';

import { resolveProj } from './utils/resolveRelativePath';

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
    throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvPaths = {
    localEnv: resolveProj(`.env.${NODE_ENV}.local`),
    localGeneral: resolveProj('.env.local'),
    sharedEnv: resolveProj(`.env.${NODE_ENV}`),
    sharedGeneral: resolveProj('.env'),
};

const dotenvFiles = [
    dotenvPaths.localEnv,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same results for everyone
    NODE_ENV !== 'test' && dotenvPaths.localGeneral,
    dotenvPaths.sharedEnv,
    dotenvPaths.sharedGeneral,
].filter((item): item is string => !!item);

// Load environment variables from .env* files.
// Suppress warnings using silent if this file is missing.
// `dotenv` will never modify any environment variables that have already been set.
// Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
for (const dotenvFile of dotenvFiles) {
    if (fs.existsSync(dotenvFile)) {
        dotenvExpand.expand(dotenv.config({ path: dotenvFile }));
    }
}
