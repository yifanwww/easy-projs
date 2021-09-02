# @package/tsconfigs

Typescript configurations for easy-projs.

## Usage

Your typescript configurations can be extended from
- `@package/tsconfigs/tsconfig.base.json`
- `@package/tsconfigs/tsconfig.eslint.json`
- `@package/tsconfigs/tsconfig.node.json`
- `@package/tsconfigs/tsconfig.react.json`

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
    "extends": "@package/tsconfigs/tsconfig.react.json",
    "compilerOptions": {
        "baseUrl": "...",
        "rootDir": "..."
    },
    "include": [],
    "exclude": []
}
```
