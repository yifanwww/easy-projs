export enum ProcessEnvKeys {
    OutputDir = 'EasyProjs_OutputDir',
    Port = 'EasyProjs_Port',
    Profile = 'EasyProjs_Profile',
    ProjectDir = 'EasyProjs_ProjectDir',
}

export type ProcessEnvs = NodeJS.Dict<string>;

export class ProcessEnv {
    private _env: ProcessEnvs = {};

    get env(): ProcessEnvs {
        return this._env;
    }

    public setEnv(key: ProcessEnvKeys, value: string | undefined): this {
        if (value) this._env[key] = value;

        return this;
    }
}

export const getEnv = (key: ProcessEnvKeys) => process.env[key];
