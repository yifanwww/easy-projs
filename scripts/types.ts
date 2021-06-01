export type Mode = 'browser' | 'nodejs' | 'react';

export interface YargsArgv {
    _: (string | number)[];
    $0: string;
    mode: Mode;
    path: string;
}
