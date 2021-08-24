# CHANGELOG
## @project/template-browser-react v0.2.0 (2021-08-24)
### Bug Fixes

- Fix tests by using jest v26

### Changes

- [ESLint] Use `@package/eslint-config` to extend this project ESLint configurations
- Reanme project name from `@projects/template-browser-react` to `@project/template-browser-react`

### Dependencies

- Delete
    - `jest`    v27.0.6

## @projects/template-browser-react v0.1.0 (2021-08-19)
### Features

- Use CRA to compile react code
- Use CRA to do testing
- Use CRA to serve this project with feature hot reload in development

### Known issues

- Cannot do test by jest v27 now, error `TypeError: babelJest.createTransformer is not a function` occurs.
