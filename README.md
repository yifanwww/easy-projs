# easy-projs

A personal monorepo that collects reusable code patterns, shared configurations, and utility libraries to make starting and maintaining projects easier.

## Repository Structure

The workspace is managed with [pnpm workspaces](https://pnpm.io/workspaces) and is organized into three top-level sections:

```
configs/    — Shared tooling configurations (ESLint, Jest, TypeScript, Stylelint)
packages/   — Reusable libraries published under the @easy-lib scope
projects/   — Standalone applications and internal tooling
```

## Configs (`@easy-config/*`)

| Package | Description |
|---|---|
| [`@easy-config/eslint-config`](configs/eslint-config) | Shared ESLint rule presets for TypeScript, React, and Jest |
| [`@easy-config/global-types`](configs/global-types) | Global TypeScript type declarations (e.g. asset module types) |
| [`@easy-config/jest-config`](configs/jest-config) | Jest configuration presets and a `unit-test` CLI for multiple environments |
| [`@easy-config/stylelint-config`](configs/stylelint-config) | Shared Stylelint rules for CSS/SCSS based on Sass guidelines |
| [`@easy-config/tsconfigs`](configs/tsconfigs) | TypeScript `tsconfig` base files for browser, Node.js, React, and Vite targets |

## Packages (`@easy-lib/*`)

### Core

| Package | Description |
|---|---|
| [`@easy-lib/types`](packages/types) | Shared TypeScript type definitions used across the workspace |
| [`@easy-lib/utils`](packages/utils) | General-purpose JavaScript/TypeScript utilities |
| [`@easy-lib/utils-browser`](packages/utils-browser) | Browser-specific utility functions |
| [`@easy-lib/utils-node`](packages/utils-node) | Node.js-specific utility functions |
| [`@easy-lib/utils-server`](packages/utils-server) | Server-side utility functions |
| [`@easy-lib/utils-test`](packages/utils-test) | Testing utilities built on top of Jest and Testing Library |
| [`@easy-lib/random-string`](packages/random-string) | Random string generation |

### React

| Package | Description |
|---|---|
| [`@easy-lib/hooks`](packages/hooks) | Useful custom React hooks (e.g. `useIsHovered`) |
| [`@easy-lib/rc`](packages/rc) | Base React component library |
| [`@easy-lib/rc-antd`](packages/rc-antd) | React components built on top of [Ant Design](https://ant.design) |

### Framework Helpers

| Package | Description |
|---|---|
| [`@easy-lib/apis`](packages/apis) | Shared API definitions |
| [`@easy-lib/fetcher`](packages/fetcher) | HTTP client / fetcher abstraction |
| [`@easy-lib/helpers-antd`](packages/helpers-antd) | Helper utilities for Ant Design |
| [`@easy-lib/helpers-class-validator`](packages/helpers-class-validator) | Helper utilities for [class-validator](https://github.com/typestack/class-validator) |
| [`@easy-lib/helpers-nestjs`](packages/helpers-nestjs) | Helper utilities for [NestJS](https://nestjs.com) |
| [`@easy-lib/helpers-redux`](packages/helpers-redux) | Helper utilities for Redux Toolkit (simpler reducer creation, thunk factories) |
| [`@easy-lib/helpers-typeorm`](packages/helpers-typeorm) | Helper utilities for [TypeORM](https://typeorm.io) |

## Projects

| Project | Description |
|---|---|
| [`bundlesize-antd`](projects/bundlesize-antd) | Tracks Ant Design bundle size history across versions |
| [`bundlesize-fluentui`](projects/bundlesize-fluentui) | Tracks Fluent UI bundle size history across versions |
| [`misc-scripts`](projects/misc-scripts) | Miscellaneous maintenance scripts |
| [`performance-js`](projects/performance-js) | JavaScript performance benchmark suite using [tinybench](https://github.com/tinylibs/tinybench) |
| [`redux-usage-demo`](projects/redux-usage-demo) | Demo app showing how to use `@easy-lib/helpers-redux` |
| [`webapp`](projects/webapp) | Main web application built with React, Ant Design, and Vite |

## Agent Skills

The `skills/` folder contains reusable agent skill workflows — slash commands that can be invoked by any AI agent tool supporting custom skills.

| Skill | Description |
|---|---|
| [`/setup-harness`](skills/setup-harness/SKILL.md) | Bootstraps harness engineering in a project: scaffolds a `docs/` knowledge base (`AGENTS.md`, `ARCHITECTURE.md`, design docs, exec plans, product specs) and creates the three workflow skills `/design-change`, `/plan-change`, and `/exec-change` — all adapted to the project's actual tech stack and conventions |

## Development

Requires Node.js ≥ 24 and [pnpm](https://pnpm.io).

```sh
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Build only config packages
pnpm run build-configs

# Build only library packages
pnpm run build-libs

# Run all tests (CI mode)
pnpm run test-ci

# Run all linters
pnpm run lint

# Typecheck all packages
pnpm run typecheck

# Format all files
pnpm run format
```

## License

[MIT](LICENSE)
