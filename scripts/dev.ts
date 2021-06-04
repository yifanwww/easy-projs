import chalk from 'chalk';
import yargs from 'yargs';

import { setProjectDirIntoEnv } from './env';
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
        [ProjectType.BrowserReact]: async (info) =>
            execute(
                Executor.ReactAppRewired,
                ['start', '--config-overrides', 'configs/webpack.react.config.js'],
                setProjectDirIntoEnv({}, info.path),
            ),
        [ProjectType.BrowserVue]: async (info) => console.log(info),
        [ProjectType.BrowserWebpack]: async (info) => {
            await execute(
                Executor.Webpack,
                ['server', '--config', 'configs/webpack.custom.config.js', '--mode', 'production'],
                setProjectDirIntoEnv({}, info.path),
            );
            return execute(Executor.Browser, [info.startupDevelopment]);
        },
        [ProjectType.Nodejs]: async (info) => execute(Executor.Tsc, ['--build', info.path, '--watch']),
    });
}

dev();
