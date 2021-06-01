import path from 'path';

import { executeCommand } from './execute-command';

const tsc = path.resolve(__dirname, '../node_modules/.bin/tsc.cmd');

export function buildNodejsProject(projectPath: string): void {
    executeCommand(tsc, `--build ${projectPath}`);
}
