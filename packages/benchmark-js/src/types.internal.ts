// eslint-disable-next-line @typescript-eslint/naming-convention
export type _Millisecond = number & { __ms__: void };

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _Nanosecond = number & { __ns__: void };

// eslint-disable-next-line @typescript-eslint/naming-convention
export type _TestFnArgument = unknown & { _arg_: void };
export type _TestFnArguments = _TestFnArgument[];

export type _TestFnArgumentValues = _TestFnArgument[];

export type Hrtime = [number, number];
