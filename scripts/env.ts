export enum EnvKeys {
    Localhost = 'EasyProjs_Localhost',
    ProjectDir = 'EasyProjs_ProjectDir',
}

export type NodeEnv = NodeJS.Dict<string>;

export interface NodeEnvWrapper {
    env: NodeEnv;
    setEnv(key: EnvKeys, value: string): NodeEnvWrapper;
}

export function createEnv(): NodeEnvWrapper {
    const env: NodeEnv = {};

    function setEnv(key: EnvKeys, value: string): NodeEnvWrapper {
        env[key] = value;

        return { env, setEnv };
    }

    return { env, setEnv };
}

export const getEnv = (key: EnvKeys) => process.env[key];
