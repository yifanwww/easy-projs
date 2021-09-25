# @config/tsconfigs

Typescript configurations for easy-projs.

## Usage

Your typescript configurations can be extended from
- `@config/tsconfigs/tsconfig.base.json`
- `@config/tsconfigs/tsconfig.eslint.json`
- `@config/tsconfigs/tsconfig.node.json`
- `@config/tsconfigs/tsconfig.node.cjs.json`
- `@config/tsconfigs/tsconfig.node.esm.json`
- `@config/tsconfigs/tsconfig.node.types.json`
- `@config/tsconfigs/tsconfig.react.json`
- `@config/tsconfigs/tsconfig.react.cjs.json`
- `@config/tsconfigs/tsconfig.react.esm.json`
- `@config/tsconfigs/tsconfig.react.types.json`

Then you need to specify the following options if need
- `compilerOptions`
  - `baseUrl`
  - `outDir`
  - `rootDir`
- `include`
- `exclude`

For example:

```json
{
    "extends": "@config/tsconfigs/tsconfig.react.json",
    "compilerOptions": {
        "baseUrl": "...",
        "rootDir": "..."
    },
    "include": [],
    "exclude": []
}
```
