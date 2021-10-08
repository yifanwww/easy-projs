# @easy/tsconfigs

Typescript configurations for easy-projs.

## Usage

Your typescript configurations can be extended from
- `@easy/tsconfigs/tsconfig.base.json`
- `@easy/tsconfigs/tsconfig.eslint.json`
- `@easy/tsconfigs/tsconfig.node.json`
- `@easy/tsconfigs/tsconfig.node.cjs.json`
- `@easy/tsconfigs/tsconfig.node.esm.json`
- `@easy/tsconfigs/tsconfig.node.types.json`
- `@easy/tsconfigs/tsconfig.react.json`
- `@easy/tsconfigs/tsconfig.react.cjs.json`
- `@easy/tsconfigs/tsconfig.react.esm.json`
- `@easy/tsconfigs/tsconfig.react.types.json`

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
    "extends": "@easy/tsconfigs/tsconfig.react.json",
    "compilerOptions": {
        "baseUrl": "...",
        "rootDir": "..."
    },
    "include": [],
    "exclude": []
}
```
