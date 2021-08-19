// https://github.com/facebook/jest/issues/11640#issuecomment-896325364

declare namespace NodeJS {
    interface Global {}
    interface InspectOptions {}

    // eslint-disable-next-line no-console
    interface ConsoleConstructor extends console.ConsoleConstructor {}
}
