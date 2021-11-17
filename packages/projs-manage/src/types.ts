export interface Author {
    email?: string;
    name?: string;
    url?: string;
}

export interface Bugs {
    email?: string;
    url?: string;
}

export interface Repository {
    diectory?: string;
    type?: string;
    url?: string;
}

export interface Engines {
    node?: string;
    vscode?: string;
}

export interface PackageInfo {
    name: string;
    version: string;
    description: string;
    main?: string;
    module?: string;
    types?: string;
    typings?: string;
    homepage?: string;
    license?: string;
    author?: string | Author;
    bugs?: Bugs;
    private?: boolean;
    repository?: Repository;
    scripts: Record<string, string>;
    engines?: Engines;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    workspaces?: string[];
}
