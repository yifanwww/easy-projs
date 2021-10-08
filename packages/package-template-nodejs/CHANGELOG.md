# CHANGELOG
## @easy/package-template-nodejs v1.0.0 (2021-10-08)
### Features

- [TSconfig] Use `@easy/tsconfigs` to extend this project Typescript configurations
- Change author name and email

### Breaking Changes

- Renamed from `@package/template-nodejs` to `@easy/package-template-nodejs`

## @package/template-nodejs v1.1.0 (2021-08-24)
### Features

- Add property `repository.directory` in packages.json
- [ESLint] Use `@config/eslint-config` to extend this project ESLint configurations

### Bug Fixes

- Correct the property `license` in packages.json to `MIT`

### Changes

- Rename package name from `@packages/template-nodejs` to `@package/template-nodejs`

### Dependencies

- Downgrade
    - `ts-jest`     v26.5.6
- Delete
    - `jest`        v27.0.6 (using v26.6.0 by `react-scripts`)

## @packages/template-nodejs v1.0.0 (2021-08-19)
### Features

- Provide commonjs, esmodule compiled code
- Provide typescript declarations
- Support testing by jest
