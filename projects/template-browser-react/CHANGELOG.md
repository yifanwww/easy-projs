# CHANGELOG
## @project/template-browser-react v0.3.0 (Unreleased)
### Features

- [TSconfig] Use `@config/tsconfigs` to extend this project Typescript configurations
- Change author name and email
- [Env] Delete environment variable `PUBLIC_URL`
- [Webpack] Use webpack configurations from `@config/scripts`
- [Webpack] Delete support for custom path alias
- [NPM-Scripts] Use NPM binary script `react-proj` to build or dev this project
- [Code] Delete redux utils, use `@package/utils-redux` instead.

## @project/template-browser-react v0.2.0 (2021-08-24)
### Bug Fixes

- Fix tests by using jest v26

### Changes

- [ESLint] Use `@config/eslint-config` to extend this project ESLint configurations
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
