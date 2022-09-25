# @easy/react-rerender-test

This project is used to test how React components rerender.

## Usage

1. `yarn dev`
2. Open `localhost:4444`

## `makeInspectedFC`

```tsx
const Child = makeInspectedFC('Child', () => <div />);

const Middle = makeInspectedFC('Middle').type('ptc');
// or
const Middle = makeInspectedFC('Middle', (props) => <>{props.children}</>).type('ptc');

const Parent = makeInspectedFC('Parent', () => <Child />);
```

You can pass no function component, as the default function component is `(props) => <>{props.children}</>`.
