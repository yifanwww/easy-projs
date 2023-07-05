export interface StorageKey {
    /**
     * The main key.
     * When saving values, will only use this key to save values and remove existing fallback key values.
     */
    main: string;
    /**
     * The fallback keys.
     * When loading values, will use these fallbacks if the main key doesn't exist in the storage.
     */
    fallbacks?: string[];
}
