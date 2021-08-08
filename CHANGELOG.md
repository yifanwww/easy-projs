# CHANGELOG

## [v0.1.0] easy-projs (2021-08-08)
### Features

- Add support for different projects
    - Browser projects, compiled by custom webpack config **NOT DONE**
    - React browser projects, compiled by CRA
    - Vue browser projects **NOT DONE**
    - Nodejs projects, commpiled by tsc
    - Each project should have a `proj-info.json` to describe itself
    - Use `scripts/control-projs/cli.ts` to `add`, `build`, `clean`, `dev`, `exec` and `validate` your projects
- Add new projects
    - Initial `Carousel`
    - `Example [browser]`
    - `Example [browser-react]`
    - Initial `Example [browser-vue]`
    - `Example [nodejs]`
    - `Memorize`
    - `Random-String`

### Dependencies

- New
    - `@reduxjs/toolkit`                        v1.6.1
    - `@testing-library/jest-dom`               v5.14.1
    - `@testing-library/react`                  v12.0.0
    - `@testing-library/react-hooks`            v7.0.1
    - `@testing-library/user-event`             v13.2.1
    - `@types/jest`                             v26.0.24
    - `@types/lodash`                           v4.14.172
    - `@types/node`                             v14.17.9
    - `@types/react`                            v17.0.16
    - `@types/react-dom`                        v17.0.9
    - `@types/react-redux`                      v7.1.18
    - `@types/speed-measure-webpack-plugin`     v1.3.4
    - `@types/yargs`                            v17.0.2
    - `@typescript-eslint/eslint-plugin`        v4.29.0
    - `@typescript-eslint/experimental-utils`   v4.29.0
    - `@typescript-eslint/parser`               v4.29.0
    - `@typescript-eslint/scope-manager`        v4.29.0
    - `@typescript-eslint/types`                v4.29.0
    - `@typescript-eslint/typescript-estree`    v4.29.0
    - `@typescript-eslint/visitor-keys`         v4.29.0
    - `chalk`                                   v4.1.2
    - `eslint-config-airbnb-typescript`         v12.3.1
    - `eslint-config-prettier`                  v8.3.0
    - `eslint-plugin-deprecation`               v1.2.1
    - `eslint-plugin-import`                    v2.23.4
    - `eslint-plugin-jest`                      v24.4.0
    - `eslint-plugin-jsx-a11y`                  v6.4.1
    - `eslint-plugin-node`                      v11.1.0
    - `eslint-plugin-prettier`                  v3.4.0
    - `eslint-plugin-react`                     v7.24.0
    - `eslint-plugin-react-hooks`               v4.2.0
    - `lodash`                                  v4.17.21
    - `prettier`                                v2.3.2
    - `react`                                   v17.0.2
    - `react-app-rewired`                       v2.1.8
    - `react-dom`                               v17.0.2
    - `react-redux`                             v7.2.4
    - `react-scripts`                           v4.0.3
    - `react-test-renderer`                     v17.0.2
    - `rimraf`                                  v3.0.2
    - `sass`                                    v1.37.5
    - `speed-measure-webpack-plugin`            v1.5.0
    - `ts-loader`                               v8.3.0
    - `tsconfig-paths-webpack-plugin`           v3.5.1
    - `typescript`                              v4.3.5
    - `web-vitals`                              v2.1.0
    - `webpack-cli`                             v4.7.2
    - `yargs`                                   v17.1.0
