# CHANGELOG
## easy-projs v0.4.0 (2022-01-04)
### Features

- [Assets] Add package `@easy/assets` to store common assets
- [NPM] Add npm script `dev` in not-react packages
- [Test] Support to pass `--verbose` when do unit test
- [Types] Add global types `PickProp`, `AnyFn`, `UnknownFn` and `VoidReturn`

### Changes

- [Git] Use `husky` to execute pre-commit scripts
- [Github] Change Github Actions timeout to 10 minutes

### Bugfixes

- Fix tsconfigs, delete some `baseUrl`

### Breaking Changes

- [Test] Delete `console.testInfo`, `console.testWarn` and `console.testError`
- [Uitls/Type] Move some global types into `@tecra/utils-type`:
  - `Contain`
  - `Contained`
  - `ExcludeFunction`
  - `ExcludeUnderscorePrefix`
  - `ExtractFunction`
  - `OmitUnderscorePrefix`

### Packages Changes

- New
  - `@easy/assets`
  - `@easy/benchmark-javascript`            v0.1.0
  - `@easy/cra-check`
  - `@easy/misc`
  - `@easy/performance-javascript`          v0.0.0
  - `@easy/performance-react`               v0.0.0
  - `@easy/projs-manage`                    v0.0.0
  - `@easy/react-rerender-test`             v0.2.0
  - `@easy/utils-react`                     v0.1.0
  - `@easy/utils-test`                      v0.1.0
  - `@easy/utils-type`                      v0.0.0
- Upgrade
  - `@easy/hooks`                           v0.2.0 -> v0.4.0
  - `@easy/project-template-browser-react`  v0.3.0 -> v0.4.0

### Dependencies

- New
  - `@types/benchmark`                          v2.1.1
  - `antd`                                      v4.16.13
  - `benchmark`                                 v2.1.4
  - `echarts`                                   v5.2.2
  - `eslint`                                    v8.2.0
  - `husky`                                     v7.0.4
  - `immer`                                     v9.0.6
  - `react-component-benchmark`                 v1.0.0
  - `react-router`                              v6.0.1
  - `react-router-dom`                          v6.0.1
  - `serve`                                     v13.0.2
  - `ts-essentials`                             v9.0.0
  - `use-immer`                                 v0.6.0
- Upgrade
  - `@typescript-eslint/eslint-plugin`          v4.32.0  -> v5.4.0
  - `@typescript-eslint/experimental-utils`     v4.32.0  -> v5.4.0
  - `@typescript-eslint/parser`                 v4.32.0  -> v5.4.0
  - `@typescript-eslint/scope-manager`          v4.32.0  -> v5.4.0
  - `@typescript-eslint/types`                  v4.32.0  -> v5.4.0
  - `@typescript-eslint/typescript-estree`      v4.32.0  -> v5.4.0
  - `@typescript-eslint/visitor-keys`           v4.32.0  -> v5.4.0
  - `eslint-config-airbnb`                      v18.2.1  -> v19.0.0
  - `eslint-config-airbnb-typescript`           v14.0.0  -> v16.1.0
  - `eslint-plugin-import`                      v2.24.2  -> v2.25.3
  - `eslint-plugin-jest`                        v24.5.0  -> v25.2.4
  - `eslint-plugin-jsx-a11y`                    v6.4.1   -> v6.5.1
  - `eslint-plugin-prettier`                    v3.4.1   -> v4.0.0
  - `eslint-plugin-react`                       v7.26.1  -> v7.27.0
  - `eslint-plugin-react-hooks`                 v4.2.0   -> v4.3.0
  - `stylelint`                                 v13.13.1 -> v14.1.0
  - `stylelint-config-recess-order`             v2.5.0   -> v3.0.0
  - `stylelint-config-sass-guidelines`          v8.0.0   -> v9.0.1
- Remove
  - `eslint-plugin-deprecation`                 v1.2.1

## easy-projs v0.3.0 (2021-10-08)
### Features

- [Hooks] The parameter `initialValue` of `useBoolean` now is optional
- [Lint] Use `stylelint-config-recess-order` to lint css properties order
- [Test] Add `console.testInfo`, `console.testWarn` and `console.testError`

### Changes

- [Lint] When in stage `pre-commit` only lint changed files
- [Test] Set jest environment to `jest-environment-jsdom`

### Breaking Changes

- Rename packages names

### Packages & Projects

- New
  - `@easy/utils-fluentui`   v0.2.0
- Rename
  - `@config/eslint-config`             v0.0.0  ->  `@easy/eslint-config`                   v0.0.0
  - `@config/scripts`                   v0.0.0  ->  `@easy/scripts`                         v0.0.0
  - `@config/stylelint-config`          v0.0.0  ->  `@easy/stylelint-config`                v0.0.0
  - `@config/tsconfigs`                 v0.0.0  ->  `@easy/tsconfigs`                       v0.0.0
  - `@package/global-types`             v0.0.0  ->  `@easy/global-types`                    v0.0.0
  - `@package/hooks`                    v0.1.0  ->  `@easy/hooks`                           v0.2.0
  - `@package/memorize`                 v1.0.0  ->  `@easy/memorize`                        v1.0.0
  - `@package/random-string`            v1.0.0  ->  `@easy/random-string`                   v1.0.0
  - `@package/template-nodejs`          v1.0.0  ->  `@easy/package-template-nodejs`         v1.0.0
  - `@package/utils-redux`              v1.0.0  ->  `@easy/utils-redux`                     v1.0.0
  - `@project/demo-test-nodejs`         v0.0.0  ->  `@easy/demo-test-nodejs`                v0.0.0
  - `@project/template-browser-react`   v0.2.0  ->  `@easy/project-template-browser-react`  v0.3.0
  - `@project/template-nodejs`          v0.2.0  ->  `@easy/project-template-nodejs`         v0.3.0

### Dependencies

- New
  - `@fluentui/react`                           v8.36.0
  - `@types/react-test-renderer`                v17.0.1
  - `babel-jest`                                v27.2.4
  - `browserslist`                              v4.17.1
  - `jest`                                      v27.2.4
  - `jest-circus`                               v27.2.4
- Upgrade
  - `@testing-library/react`                    v12.0.0   -> v12.1.1
  - `@testing-library/react-hooks`              v7.0.1    -> v7.0.2
  - `@types/jest`                               v26.0.24  -> v27.0.2
  - `@types/lodash`                             v4.14.172 -> v4.14.175
  - `@types/node`                               v16.6.1   -> v16.10.2
  - `@types/react`                              v17.0.18  -> v17.0.26
  - `@typescript/eslint-plugin`                 v4.31.2   -> v4.32.0
  - `@typescript/experimental-utils`            v4.31.2   -> v4.32.0
  - `@typescript/parser`                        v4.31.2   -> v4.32.0
  - `@typescript/scope-manager`                 v4.31.2   -> v4.32.0
  - `@typescript/types`                         v4.31.2   -> v4.32.0
  - `@typescript/typescript-estree`             v4.31.2   -> v4.32.0
  - `@typescript/visitor-keys`                  v4.31.2   -> v4.32.0
  - `concurrently`                              v6.2.1    -> v6.2.2
  - `eslint-plugin-jest`                        v24.4.2   -> v24.5.0
  - `eslint-plugin-react`                       v7.26.0   -> v7.26.1
  - `jest-watch-typeahead`                      v0.6.4    -> v1.0.0
  - `prettier`                                  v2.3.2    -> v2.4.1
  - `react-redux`                               v7.2.4    -> v7.2.5
  - `sass`                                      v1.38.0   -> v1.42.1
- Remove
  - `@types/yargs`                              v17.0.2
  - `ts-jest`                                   v26.5.6
  - `yargs`                                     v17.1.1

## easy-projs v0.2.0 (2021-10-01)
### Features

- [License] Add MIT license
- [Git] Lint code before git commit (in git pre-commit stage)
- [Github] Add issue templates
- [Github] Do build, lint and test in Github workflows
- [Lint] Use `@config/eslint-config` to extend this project ESLint configurations
- [Lint] Use `@config/stylelint-config` to lint css code
- [NPM] Call workspaces' npm scripts in root project
- [Scripts] Add NPM scripts `build-packages` and `build-projects`
- [Test] Use custom jest configurations to do unit test
- [Webpack] Add react webpack configurations in `@config/scripts`

### Changes

- [Build] Only do incremental compilation for nodejs projects
- [Scripts] Delete root scripts

### Configurations & Packages & Projects

- New
  - `@config/eslint-config`
  - `@config/scripts`
  - `@config/stylelint-config`
  - `@config/tsconfigs`
  - `@package/global-types`
  - `@package/hooks`                        v0.1.0
  - `@package/memorize`                     v1.0.0
  - `@package/random-string`                v1.0.0
  - `@package/template-nodejs`              v1.1.0
  - `@package/utils-redux`                  v1.0.0
  - `@project/demo-test-nodejs`
  - `@project/template-nodejs`              v0.2.0
  - `@project/template-browser-react`       v0.2.0
- Delete
  - `Carousel`
  - `Example [browser]`
  - `Example [browser-react]`
  - `Example [browser-vue]`
  - `Example [nodejs]`
  - `Memorize`
  - `Random-String`

### Dependencies

- New
  - `concurrently`                              v6.2.1
  - `eslint-config-airbnb`                      v18.2.1
  - `jest-watch-typeahead`                      v0.6.4
  - `lint-staged`                               v11.1.2
  - `stylelint`                                 v13.13.1
  - `stylelint-config-sass-guidelines`          v8.0.0
  - `ts-jest`                                   v26.5.6
  - `typescript-plugin-css-modules`             v3.4.0
- Upgrade
  - `@types/node`                               v14.17.9 -> v16.6.1
  - `@types/react`                              v17.0.16 -> v17.0.18
  - `@typescript-eslint/eslint-plugin`          v4.29.0  -> v4.31.2
  - `@typescript-eslint/experimental-utils`     v4.29.0  -> v4.31.2
  - `@typescript-eslint/parser`                 v4.29.0  -> v4.31.2
  - `@typescript-eslint/scope-manager`          v4.29.0  -> v4.31.2
  - `@typescript-eslint/types`                  v4.29.0  -> v4.31.2
  - `@typescript-eslint/typescript-estree`      v4.29.0  -> v4.31.2
  - `@typescript-eslint/visitor-keys`           v4.29.0  -> v4.31.2
  - `eslint-config-airbnb-typescript`           v12.3.1  -> v14.0.0
  - `eslint-plugin-import`                      v2.23.4  -> v2.24.2
  - `eslint-plugin-jest`                        v24.4.0  -> v24.4.2
  - `eslint-plugin-prettier`                    v3.4.0   -> v3.4.1
  - `eslint-plugin-react`                       v7.24.0  -> v7.26.0
  - `sass`                                      v1.37.5  -> v1.38.0
  - `typescript`                                v4.3.5   -> v4.4.3
  - `webpack-cli`                               v4.7.2   -> v4.8.0
  - `yargs`                                     v17.1.0  -> v17.1.1
- Deleted
  - `@types/speed-measure-webpack-plugin`       v1.3.4
  - `jest`                                      v27.0.6
  - `speed-measure-webpack-plugin`              v1.5.0

## easy-projs v0.1.0 (2021-08-08)
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
