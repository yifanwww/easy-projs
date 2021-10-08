# @easy/scripts

Scripts for easy-projs.

## Binary

This package contains several binary which can be called via `npx` (or `yarn`) directly:

- `build-packages`
  Build app packages.
- `build-projects`
  Build app projects.
- `react-proj`
  - `react-proj build`
    Build react project.
  - `react-proj build-profile`
    Build react project with profiling enabled. See [React Profiling].
  - `react-proj dev`
    Dev react project.
- `format-code`
  Format source code by `prettier`.
- `skip-npm-script`
  Skip a npm script, some npm scripts must exist to avoid error `Missing script` when execute a script with `--workspaces`.

## Configurations

## Build

You will need to build this package before building packages and projects.

<!-- links -->

[react profiling]: https://create-react-app.dev/docs/production-build#profiling
