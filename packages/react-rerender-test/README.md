# @easy/react-rerender-test

This project is used to test how React components rerender.

## Usage

1. `yarn dev`
2. Open `localhost:4444`

## `makeInspectedFC`

```tsx
const Child = makeInspectedFC('Child')(() => <div />);
```

```tsx
const Middle = makeInspectedFC({ name: 'Middle', type: 'ptc' })();
// ot
const Middle = makeInspectedFC({ name: 'Middle', type: 'ptc' })((props) => <>{props.children}</>);
```

You can pass no function component, as the default function component is `(props) => <>{props.children}</>`.
