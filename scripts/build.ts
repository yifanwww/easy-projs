import chalk from 'chalk';
import yargs from 'yargs';

import { setProjectDirIntoEnv } from './env';
import { execute, Executor } from './execute';
import { projectInfos, ProjectType, switchProjectType } from './project-infos';

interface YargsBuildArgv {
    _: (string | number)[];
    $0: string;
    all: boolean | undefined;
    name: string | undefined;
}

function parseArgs(): YargsBuildArgv {
    return yargs
        .option('all', {
            alias: 'a',
            boolean: true,
            describe: 'Compiles all the projects.',
        })
        .option('name', {
            alias: 'n',
            describe: 'Specifies the name of the specified project.',
            string: true,
        }).argv as YargsBuildArgv;
}

async function _build(name: string): Promise<void> {
    if (!(name in projectInfos)) {
        console.error(chalk.red(`[build] Unknown project name: ${name}`));
        return;
    }

    return switchProjectType(projectInfos[name], {
        [ProjectType.BrowserReact]: async (dinfo) =>
            execute(
                Executor.ReactAppRewired,
                ['build', '--config-overrides', 'configs/webpack.react.config.js'],
                setProjectDirIntoEnv({}, dinfo.path),
            ),
        [ProjectType.BrowserVue]: async (dinfo) => console.log(dinfo),
        [ProjectType.BrowserWebpack]: async (dinfo) =>
            execute(
                Executor.Webpack,
                ['--config', 'configs/webpack.custom.config.js', '--mode', 'production'],
                setProjectDirIntoEnv({}, dinfo.path),
            ),
        [ProjectType.Nodejs]: async (dinfo) => execute(Executor.Tsc, ['--build', dinfo.path]),
    });
}

async function build(): Promise<void> {
    const { all, name } = parseArgs();

    if (!all && !name) {
        console.info(chalk.yellow('Specifies no project to compile.'));
    } else if (name) {
        return _build(name);
    } else {
        for (const projectName in projectInfos) {
            // eslint-disable-next-line no-await-in-loop
            await _build(projectName);
        }
    }
}

build();
