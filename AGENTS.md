# AGENTS.md

## What This Project Is

A personal monorepo of reusable code patterns, shared configurations, and utility libraries.
Managed with pnpm workspaces. TypeScript throughout.

## Development Commands

```sh
pnpm install            # Install dependencies
pnpm run build          # Build all packages recursively
pnpm run build-configs  # Build `@easy-config/*` packages
pnpm run build-libs     # Build `@easy-lib/*` packages
pnpm run clean          # Clean all build artifacts
pnpm run format         # Format with Prettier
pnpm run lint           # Lint all packages
pnpm run lint-fix       # Lint and auto-fix all packages
pnpm run test           # Run all tests
pnpm run typecheck      # Type-check all packages
```

## Repository Layout

```
configs/              Shared tooling configs (@easy-config/*)
  eslint-config/        ESLint rule presets for TS, React, Jest
  global-types/         Global TypeScript type declarations
  jest-config/          Jest presets + unit-test CLI
  stylelint-config/     Stylelint rules for CSS/SCSS
  tsconfigs/            tsconfig base files for browser, Node, React, Vite
packages/             Reusable libraries (@easy-lib/*)
  types/                Shared TypeScript type definitions
  utils/                General-purpose JS/TS utilities
  utils-browser/        Browser-specific utilities
  utils-node/           Node.js-specific utilities
  utils-server/         Server-side utilities
  utils-test/           Testing utilities (Jest, Testing Library)
  hooks/                Custom React hooks
  rc/                   Base React component library
  rc-antd/              React components built on Ant Design
  apis/                 API utilities
  fetcher/              Fetch abstraction layer
  helpers-antd/         Ant Design helpers
  helpers-class-validator/  class-validator helpers
  helpers-nestjs/       NestJS helpers
  helpers-typeorm/      TypeORM helpers
projects/             Standalone applications and scripts
  webapp/               Web application
  misc-scripts/         Miscellaneous scripts
scripts/              Monorepo-level scripts
skills/               Agent skill definitions
templates/            Project templates (server, software)
docs/                 Knowledge base (design docs, exec plans, specs)
```

## Key Documents

| Document              | Purpose                              |
| --------------------- | ------------------------------------ |
| `README.md`           | Project overview and package catalog |
| `pnpm-workspace.yaml` | Workspace package definitions        |

## Key Operating Principles

- **Avoid large modules.** When a non-test file exceeds roughly 1,000 lines of code, add new
  functionality in a new file rather than extending it, unless a strong documented reason says
  otherwise.
- **Enforce mechanically where possible.** Prefer tests over documentation-only rules.
- **Prefer `.css`** for styling by default. Use `.scss` only when leveraging SCSS features
  (variables, mixins, nesting, `darken()`/`lighten()`)
- **Prefer `interface` over `type`** for object shapes and contracts
  - Data structure interfaces: no prefix — `User`, `Config`
  - Class contract interfaces: prefix with `I` — `ILogger`, `IRepository`

## Practical Notes

- Commit messages follow Conventional Commits: `<type>(<scope>): <description>`, See
  `git log --oneline` for examples
