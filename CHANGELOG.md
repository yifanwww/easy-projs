# CHANGELOG
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
