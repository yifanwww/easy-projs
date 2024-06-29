interface ExtraGlobalThis {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __EXPERIMENTAL__: boolean;
}

export function createExperimentalVarMocker(global: typeof globalThis) {
    const typedGlobal = global as typeof globalThis & ExtraGlobalThis;

    const INITIAL_EXPERIMENTAL = typedGlobal.__EXPERIMENTAL__;

    function mockExperimentalVar(value: boolean) {
        typedGlobal.__EXPERIMENTAL__ = value;
    }

    function resetExperimentalVar() {
        typedGlobal.__EXPERIMENTAL__ = INITIAL_EXPERIMENTAL;
    }

    return { mockExperimentalVar, resetExperimentalVar };
}
