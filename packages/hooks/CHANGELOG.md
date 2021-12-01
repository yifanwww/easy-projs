# CHANGELOG
## @easy/hooks v0.4.0 (Unreleased)
### Features

- Add new hooks
  - `useCountdown`
  - `useDelayFn`
  - `useDoubleTrigger`
  - `useInterval`
  - `useIsMounted`
  - `useSingleInterval`
  - `useSingleTimeout`

### Breaking Changes

- Rename interface `IUseBooleanActions` to `UseBooleanActions`
- Rename interface `IUseToggleUpdaters` to `UseToggleActions`

## @easy/hooks v0.3.0 (2021-11-03)
### Features

- Add hook `usePersistFn`
- Improve `usePrevious`, only re-run effect when value changes
- Simplify `useConstFn`

### Breaking Changes

- Rename interface `IUseBooleanUpdaters` to `IUseBooleanActions`

## @easy/hooks v0.2.0 (2021-10-08)
### Features

- The parameter `initialValue` of `useBoolean` now is optional

### Changes

- Move tests into __tests__, rename testUtils.ts to utils.test.ts

### Breaking Changes

- Renamed from `@package/hooks` to `@easy/hooks`

## @package/hooks v0.1.0 (2021-09-30)
### Features

- `useBoolean`
- `useConst`
- `useConstFn`
- `useForceUpdate`
- `useImmediateFocus`
- `useIsFocused`
- `useIsHovered`
- `useMount`
- `usePrevious`
- `useToggle`
- `useUnmount`
- `useWhyDidYouUpdate`
