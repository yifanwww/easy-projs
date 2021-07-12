export interface BaseYargsArgv {
    _: Array<string | number>;
    $0: string;
}

export interface AddYargsArgv extends BaseYargsArgv {
    folder?: string;
    list?: boolean;
    name?: string;
    template?: string;
}

export interface BuildYargsArgv extends BaseYargsArgv {
    all?: boolean;
    list?: boolean;
    name?: string;
}

export interface CleanYargsArgv extends BaseYargsArgv {
    all: boolean;
    list?: boolean;
    name?: string;
}

export interface DevYargsArgv extends BaseYargsArgv {
    list?: boolean;
    name?: string;
}

export interface ExecYargsArgv extends BaseYargsArgv {
    list?: boolean;
    name?: string;
}

export interface ValidateYargsArgv extends BaseYargsArgv {}
