export enum ProcessEnvKeys {
    OutputDir = 'EasyProjs_OutputDir',
    Port = 'EasyProjs_Port',
    Profile = 'EasyProjs_Profile',
    ProjectDir = 'EasyProjs_ProjectDir',
}

export type ProcessEnv = NodeJS.Dict<string>;

export class ProcessEnvManager {
    private _env: ProcessEnv = {};

    get env(): ProcessEnv {
        return this._env;
    }

    public setEnv(key: ProcessEnvKeys, value: string | undefined): this {
        if (value) this._env[key] = value;

        return this;
    }
}

export const getEnv = (key: ProcessEnvKeys) => process.env[key];