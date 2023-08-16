# @easy-pkg/helpers-redux

Redux helpers for easy-projs.

## Usage
### `ReduxReducer`

This type is used to create redux reducers in a simpler way.

```ts
import { ReduxReducer } from '@easy-pkg/helpers-redux';

export interface EasyState {
    prepared: boolean;
}

type EasyReducer<Payload = undefined> = ReduxReducer<EasyState, Payload>;
```

Then you can use `EasyReducer` to create your reducers.

```ts
export const _finishPreparing: EasyReducer = (state) => {
    state.prepared = true;
};
```

### `omitUnderscorePrefixActions`

There are some reducers which only be used in Redux middlewares, while the other reducers can be used both in Redux middlewares and React components.

This function is used to avoid using the internal reducers in react components.

```ts
import { omitUnderscorePrefixActions } from '@easy-pkg/helpers-redux';

const getInitialState = (): EasyState => ({ prepared: false });

const slice = createSlice({
    name: 'easy-projs',
    initialState: getInitialState(),
    reducers: {
        _finishPreparing,
    },
});

export const _actions = slice.actions;
export const actions = omitUnderscorePrefixActions(slice.actions);

export const store = configureStore({ reducer: slice.reducer });
```

Where outside Redux middlewares should not import `_actions`.

### `thunkCreatorFactory`

You will need to specify a thunk name if you use `createAsyncThunk` to create an asynchronous middleware.

You can use `thunkCreatorFactory` to create asynchronous middlewares if there is no need to specify a thunk name.

First, you need to create a creator by using this factory `thunkCreatorFactory`.

```ts
import { thunkCreatorFactory } from '@easy-pkg/helpers-redux';

export const createEasyThunk = thunkCreatorFactory<EasyState>();
```

Then you can use this creator to create asynchronous middlewares.

```ts
export const prepare = createEasyThunk((dispatch) => {
    // Do something before users using this application.

    dispatch(_actions._finishPreparing());
});

export const thunks = {
    prepare,
};
```

### `useDispatchingActions` and `useDispatchingThunks`

This two functions are used to help use `dispatch`.

Usually, this is how we use `dispatch`:

```tsx
export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // do something

        dispatch(actions.doSomething1(parameters1));
    }, [dispatch]);

    const callback = useCallback(() => {
        // do something

        dispatch(thunks.doSomething2(parameters2));
    }, [dispatch]);

    return ...;
}
```

This can be simpler, we don't need to use `dispatch` directly.

First, you need to create two hooks.

```ts
export const useEasyDispatchingActions = () => useDispatchingActions(actions);
export const useEasyDispatchingThunks = () => useDispatchingThunks(thunks);
```

Then you can write component `App` in such a way.

```tsx
export function App() {
    const classes = useStyles();

    const { doSomething1 } = useEasyDispatchingActions();
    const { doSomething2 } = useEasyDispatchingThunks();

    useEffect(() => {
        // do something

        doSomething1(parameters1);
    }, [doSomething1]);

    const callback = useCallback(() => {
        // do something

        doSomething2(parameters2);
    }, [doSomething2]);

    return ...;
}
```

## Develop this package

You need to build package `@easy-config/scripts` before building or testing this package.

### Build this package

Execute `pnpm run build` to build this package.

### Do coverage test

- Execute `pnpm run test` to watch test.
- Execute `pnpm run test-full` to do full coverage test.
