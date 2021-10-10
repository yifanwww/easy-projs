# CHANGELOG
## @easy/project-template-nodejs v0.3.0 (2021-10-08)
### Features

- Change author name and email
- [TSconfig] Use `@easy/tsconfigs` to extend this project Typescript configurations

### Breaking Changes

- Renamed from `@project/template-nodejs` to `@easy/project-template-nodejs`

## @project/template-nodejs v0.2.0 (2021-08-24)
### Features

- Add property `repository.directory` in packages.json
- [ESLint] Use `@config/eslint-config` to extend this project ESLint configurations

### Bug Fixes

- Correct the property `license` in packages.json to `MIT`

### Changes

- Rename project name from `@projects/template-nodejs` to `@project/template-nodejs`

### Dependencies

- Downgrade
    - `ts-jest`     v26.5.6
- Delete
    - `jest`        v27.0.6 (using v26.6.0 by `react-scripts`)

## @projects/template-nodejs v0.1.0 (2021-08-19)
### Features

- Use typescript to compile code to generage commonjs code
- Support testing by jest