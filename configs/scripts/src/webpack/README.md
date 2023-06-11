# Webpack Configuration

## Advanced Configuration

You can adjust various development and production settings by setting environment variables in your shell or with `.env`.

Support built-in environment variables:

| Variable                | Development | Production | Usage |
| :---------------------- | :---------: | :--------: | :---- |
| WDS_SOCKET_HOST         |   ✅ Used    | 🚫 Ignored  |       |
| WDS_SOCKET_PATH         |   ✅ Used    | 🚫 Ignored  |       |
| WDS_SOCKET_PORT         |   ✅ Used    | 🚫 Ignored  |       |
| PUBLIC_URL              |   ✅ Used    |   ✅ Used   |       |
| BUILD_PATH              |  🚫 Ignored  |   ✅ Used   |       |
| CI                      |   ✅ Used    |   ✅ Used   |       |
| IMAGE_INLINE_SIZE_LIMIT |   ✅ Used    |   ✅ Used   |       |

Support custom environment variables, the name of a custom environment variable must starts with `REACT_APP_`.
