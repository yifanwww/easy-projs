import { CommandModule } from 'yargs';

import { version } from '../version';

export const command: CommandModule = {
    command: 'version',
    describe: 'version control',
    handler: version,
};
