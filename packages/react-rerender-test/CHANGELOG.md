# CHANGELOG
## @easy/react-renderer-test v0.3.0 (Unreleased)
### Features

- Test memorized nested function component

## @easy/react-renderer-test v0.2.0 (2021-11-07)
### Features

- Support to display multi group render order list
- Support to display group name and highlight group UI when multiple groups are shown

## @easy/react-renderer-test v0.1.0 (2021-11-06)
### Features

- At home page, you can navigate to rerender test pages
- You can also navigate pages via sidebar
- You can see the rerender order in render-order list
- You can check how React components rerender in five situation:
  - `change level` (`ptc` & `prc`)
  - `change parent` (`ptc` & `prc`)
  - `nested function component`
  - `rerender parent` (`ptc` & `prc`)
  - `router` (`ptc` & `prc`)
- For every inspected component, there is a component view for you to see the details
  - name
  - render count

- NOTE: We only support to check the rerender at React version `17.0.2`
