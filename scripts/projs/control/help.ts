import chalk from 'chalk';

import { log } from '../../log';
import { ProjInfos } from '../info';

export function printProjsProvided(templates: ProjInfos, excludes: string[] = []): void {
    log.info('You have the following projects to select:');

    const templateKeys = Object.keys(templates).filter((name) => !excludes.includes(name));
    const maxLen = templateKeys.reduce((prev, name) => Math.max(prev, name.length), 0);

    templateKeys.forEach((name) =>
        log.noDefaultColor.info(`- ${name}`.padEnd(maxLen + 6) + chalk.blackBright(templates[name].path)),
    );
}
