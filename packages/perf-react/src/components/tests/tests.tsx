import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import css from './tests.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ComponentView(props: Record<string, unknown>) {
    return <div className={css.root} />;
}

export function NoHooks() {
    const obj = {};
    const fn = () => {};

    return <ComponentView obj={obj} callback={fn} />;
}

export function UseMemo() {
    const obj = useMemo(() => ({}), []);
    const fn = () => {};

    return <ComponentView obj={obj} callback={fn} />;
}

export function UseCallback() {
    const obj = {};
    const fn = useCallback(() => {}, []);

    return <ComponentView obj={obj} callback={fn} />;
}

export function UseRef() {
    const obj = useRef(() => ({}));
    const fn = () => {};

    return <ComponentView obj={obj} callback={fn} />;
}

export function UseState() {
    const [obj, setObj] = useState(() => ({}));

    return <ComponentView obj={obj} callback={setObj} />;
}

export function UseReducer() {
    const [obj, dispatch] = useReducer((prev) => ({ ...prev }), {});

    return <ComponentView obj={obj} callback={dispatch} />;
}
