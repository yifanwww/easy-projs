# @easy-config/tsconfigs

Typescript configurations for easy-projs.

## Usage

Your typescript configurations can be extended from this package.

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
