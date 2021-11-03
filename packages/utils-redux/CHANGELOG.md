# CHANGELOG
## @easy/utils-redux v1.1.0 (Unreleased)
### Breaking Changes

- `createTypedSelector` is no longer supported, use `react-redux` `TypedUseSelectorHook` instead.
- `WritableDraft` won't be re-exported from `immer`
- Rename types
  - `IReducer`              -> `ReduxReducer`
  - `IThunkAction`          -> `ThunkAction`
  - `IThunk`                -> `ThunkFn`
  - `IThunkActionWithArgs`  -> `ThunkArgsAction`

## @easy/utils-redux v1.0.0 (2021-10-08)
### Breaking Changes

- Renamed from `@packages/utils-redux` to `@easy/utils-redux`

## @packages/utils-redux v1.0.0 (2021-09-30)
### Features

- Add util functions:
  - `createTypedSelector`
  - `omitUnderscorePrefixActions`
  - `thunkCreatorFactory`
  - `useDispatchingActions`
  - `useDispatchingThunks`
- Add util type declarations (mainly used):
  - `IActions`
  - `IDispatchingActions`
  - `IDispatchingThunks`
  - `IReducer`
  - `IThunkClosure`
  - `IThunks`
