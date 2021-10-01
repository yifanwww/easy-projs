# @package/utils-redux

Redux utils for easy-projs.

## Usage
### `IReducer`

This type is used to create redux reducers in a simpler way.

```ts
import { IReducer } from '@package/utils-redux';

export interface IEasyProjsState {
    prepared: boolean;
}

type EasyProjsReducer<Payload = undefined> = IReducer<IEasyProjsState, Payload>;
```

Then you can use `EasyProjsReducer` to create your reducers.

```ts
export const _finishPreparing: EasyProjsReducer = (state) => {
    state.prepared = true;
};
```

### `omitUnderscorePrefixActions`

There are some reducers which only be used in Redux middlewares, while the other reducers can be used both in Redux middlewares and React components.

This function is used to avoid using the internal reducers in react components.

```ts
import { omitUnderscorePrefixActions } from '@package/utils-redux';

const getInitialState = (): IEasyProjsState => ({ prepared: false });

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
import { thunkCreatorFactory } from '@package/utils-redux';

export const createEasyProjsThunk = thunkCreatorFactory<IEasyProjsState>();
```

Then you can use this creator to create asynchronous middlewares.

```ts
export const prepare = createEasyProjsThunk((dispatch) => {
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
export const useEasyProjsDispatchingActions = () => useDispatchingActions(actions);
export const useEasyProjsDispatchingThunks = () => useDispatchingThunks(thunks);
```

Then you can write component `App` in such a way.

```tsx
export function App() {
    const classes = useStyles();

    const { doSomething1 } = useEasyProjsDispatchingActions();
    const { doSomething2 } = useEasyProjsDispatchingThunks();

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

### `createTypedSelector`

`createTypedSelector` is used to create a generic version of `useSelector`.

```ts
export const useEasyProjsSelector = createTypedSelector<IEasyProjsState>();
```

Then you can use `useEasyProjsSelector` to create multiple selectors.

```ts
export const usePrepared = () => useMainSelector((state) => state.prepared);
```

## Develop this package

You need to build package `@config/scripts` before building or testing this package.

### Build this package

Execute `npm run build` or `yarn build` to build this package.

### Do coverage test

- Execute `npm run test` or `yarn test` to watch test.
- Execute `npm run test-coverage` or `yarn test-coverage` to do coverage test.