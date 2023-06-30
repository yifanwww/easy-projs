# @easy-config/tsconfigs

Typescript configurations for easy-projs.

## Usage

Your typescript configurations can be extended from
- `@easy-config/tsconfigs/tsconfig.base.json`
- `@easy-config/tsconfigs/tsconfig.eslint.node.json`
- `@easy-config/tsconfigs/tsconfig.eslint.react.json`
- `@easy-config/tsconfigs/tsconfig.node.bundler.json`
- `@easy-config/tsconfigs/tsconfig.node.bundler.types.json`
- `@easy-config/tsconfigs/tsconfig.node.cjs.json`
- `@easy-config/tsconfigs/tsconfig.node.esm.json`
- `@easy-config/tsconfigs/tsconfig.node.esm.types.json`
- `@easy-config/tsconfigs/tsconfig.react.json`
- `@easy-config/tsconfigs/tsconfig.react.types.json`

Then you need to specify the following options if need
- `compilerOptions`
  - `baseUrl` (if you have path aliases setup)
  - `outDir`
  - `rootDir`
- `include`
- `exclude`

For example:

```json
{
    "extends": "@easy-config/tsconfigs/tsconfig.react.json",
    "compilerOptions": {
        "rootDir": "..."
    },
    "include": [],
    "exclude": []
}
```
