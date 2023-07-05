/**
 * Mock implementation of local storage.
 */
export function mockStorage(storage: Storage): void {
    // Mocks will be restored before every test because Jest option `resetMocks` is turned on.
    beforeEach(() => {
        let store: Record<string, string> = {};

        const prototype = Reflect.getPrototypeOf(storage) as Storage;

        // properties

        jest.spyOn(prototype, 'length', 'get').mockImplementation(() => Object.keys(store).length);

        // methods

        jest.spyOn(prototype, 'clear').mockImplementation(() => {
            store = {};
        });

        jest.spyOn(prototype, 'getItem').mockImplementation((key) => (key in store ? store[key] : null));

        jest.spyOn(prototype, 'key').mockImplementation((index) => {
            const keys = Object.keys(store);
            return index >= keys.length ? null : keys[index];
        });

        jest.spyOn(prototype, 'removeItem').mockImplementation((key) => {
            delete store[key];
        });

        jest.spyOn(prototype, 'setItem').mockImplementation((key, value) => {
            store[key] = value;
        });
    });
}
