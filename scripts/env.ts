const keys = {
    projectDir: 'EasyProjsTargetProjectDir',
};

export type NodeEnv = NodeJS.Dict<string>;

function setEnv(env: NodeEnv, key: string, value: string): NodeEnv {
    env[key] = value;
    return env;
}

const getEnv = (key: string): string => process.env[key]!;

export const setProjectDirIntoEnv = (env: NodeEnv, path: string) => setEnv(env, keys.projectDir, path);

export const getProjectDirFromEnv = () => getEnv(keys.projectDir);
