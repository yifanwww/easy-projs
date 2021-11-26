# @easy/global-types

Global type declarations for easy-projs.

This package contains the following type declarations:
- types which help to import assets
- types which help to test code
- types which help to handle complex types
- types which help to use modules easier

## Usage

Add reference to this package in your global type declaration file.

For example:

```ts
// global.d.ts

/// <reference types="@easy/global-types" />
```

```ts
// global.d.ts

/// <reference types="@easy/global-types/lib/env" />
/// <reference types="@easy/global-types/lib/test" />
/// <reference types="@easy/global-types/lib/utils.type" />
```

In React packages you will need to import `@easy/global-types/lib/utils.react` manually:

```ts
// global.d.ts

/// <reference types="@easy/global-types" />
/// <reference types="@easy/global-types/lib/utils.react" />
```
