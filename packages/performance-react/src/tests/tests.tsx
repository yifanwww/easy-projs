import scss from './tests.module.scss';

function ComponentView() {
    return <div className={scss.root} />;
}

export function NoHooks() {
    return <ComponentView />;
}

export function UseMemo() {
    return <div />;
}

export function UseCallback() {
    return <div />;
}

export function UseRef() {
    return <div />;
}

export function UseState() {
    return <div />;
}

export function UseReducer() {
    return <div />;
}
