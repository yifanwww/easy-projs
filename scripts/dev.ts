import chalk from 'chalk';
import yargs from 'yargs';

import { execute, Executor } from './execute';
import { projectInfos, ProjectType, switchProjectType } from './project-infos';

interface YargsDevArgv {
    _: (string | number)[];
    $0: string;
    name: string;
}

function parseArgs(): YargsDevArgv {
    return yargs.option('name', {
        alias: 'n',
        demandOption: true,
        describe: 'Specifies the name of the specified project.',
        string: true,
    }).argv as YargsDevArgv;
}

async function dev(): Promise<void> {
    const { name } = parseArgs();

    if (!(name in projectInfos)) {
        console.error(chalk.red(`[dev] Unknown project name: ${name}`));
        return;
    }

    return switchProjectType(projectInfos[name], {
        [ProjectType.BrowserReact]: async (_info) =>
            execute(Executor.ReactAppRewired, ['start', '--config-overrides', 'configs/webpack.react.config.js'], {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                EasyProjsTargetProjectPath: _info.path,
            }),
        [ProjectType.BrowserVue]: async (_info) => console.log(_info),
        [ProjectType.BrowserWebpack]: async (_info) => console.log(_info),
        [ProjectType.Nodejs]: async (_info) => execute(Executor.Tsc, ['--build', _info.path, '--watch']),
    });
}

dev();
