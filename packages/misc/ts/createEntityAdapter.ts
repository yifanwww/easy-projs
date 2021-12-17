/*
 * Modified from https://github.com/reduxjs/redux-toolkit/tree/v1.7.1/packages/toolkit/src/entities
 */

export type Comparer<T> = (a: T, b: T) => number;

export type IdSelector<T> = (model: T) => string;

interface Dictionary<T> {
    [id: string]: T | undefined;
}

export type Update<T> = { id: string; changes: Partial<T> };

export interface EntityState<T> {
    ids: string[];
    entities: Dictionary<T>;
}

export interface EntityDefinition<T> {
    selectId: IdSelector<T>;
    sortComparer: false | Comparer<T>;
}

export type IsAny<T, True, False = never> = true | false extends (T extends never ? true : false) ? True : False;
export type PreventAny<S, T> = IsAny<S, EntityState<T>, S>;

export interface EntityStateAdapter<T> {
    addOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;
    addMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: readonly T[] | Record<string, T>): S;
    setOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;
    setMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: readonly T[] | Record<string, T>): S;
    setAll<S extends EntityState<T>>(state: PreventAny<S, T>, entities: readonly T[] | Record<string, T>): S;
    removeOne<S extends EntityState<T>>(state: PreventAny<S, T>, key: string): S;
    removeMany<S extends EntityState<T>>(state: PreventAny<S, T>, keys: readonly string[]): S;
    removeAll<S extends EntityState<T>>(state: PreventAny<S, T>): S;
    updateOne<S extends EntityState<T>>(state: PreventAny<S, T>, update: Update<T>): S;
    updateMany<S extends EntityState<T>>(state: PreventAny<S, T>, updates: ReadonlyArray<Update<T>>): S;
    upsertOne<S extends EntityState<T>>(state: PreventAny<S, T>, entity: T): S;
    upsertMany<S extends EntityState<T>>(state: PreventAny<S, T>, entities: readonly T[] | Record<string, T>): S;
}

export interface EntitySelectors<T, V> {
    selectIds: (state: V) => string[];
    selectEntities: (state: V) => Dictionary<T>;
    selectAll: (state: V) => T[];
    selectTotal: (state: V) => number;
    selectById: (state: V, id: string) => T | undefined;
}

export interface EntityAdapter<T> extends EntityStateAdapter<T> {
    selectId: IdSelector<T>;
    sortComparer: false | Comparer<T>;
    getInitialState(): EntityState<T>;
    getSelectors(): EntitySelectors<T, EntityState<T>>;
    getSelectors<V>(selectState: (state: V) => EntityState<T>): EntitySelectors<T, V>;
}

function createSelectorsFactory<T>() {
    type R = EntityState<T>;

    function getSelectors(): EntitySelectors<T, R>;
    function getSelectors<V>(selectState: (state: V) => R): EntitySelectors<T, V>;
    function getSelectors<V>(selectState: (state: V) => R = (state) => state as never): EntitySelectors<T, V> {
        return {
            selectIds: (state) => selectState(state).ids,
            selectEntities: (state) => selectState(state).entities,
            selectAll: (state) => {
                const { entities, ids } = selectState(state);
                return ids.map((id) => <T>entities[id]);
            },
            selectTotal: (state) => selectState(state).ids.length,
            selectById: (state, id) => selectState(state).entities[id],
        };
    }

    return { getSelectors };
}

function selectIdValue<T>(entity: T, selectId: IdSelector<T>): string {
    const key = selectId(entity);

    if (process.env.NODE_ENV !== 'production' && key === undefined) {
        console.warn(
            'The entity passed to the `selectId` implementation returned undefined.',
            'You should probably provide your own `selectId` implementation.',
            'The entity that was passed:',
            entity,
            'The `selectId` implementation:',
            selectId.toString(),
        );
    }

    return key;
}

function ensureEntitiesArray<T>(entities: readonly T[] | Record<string, T>): readonly T[] {
    return !Array.isArray(entities) ? Object.values(entities) : entities;
}

function splitAddedUpdatedEntities<T>(
    state: EntityState<T>,
    entities: readonly T[] | Record<string, T>,
    selectId: IdSelector<T>,
): [T[], Update<T>[]] {
    const _entities = ensureEntitiesArray(entities);

    const added: T[] = [];
    const updated: Update<T>[] = [];

    for (const entity of _entities) {
        const id = selectIdValue(entity, selectId);
        if (id in state.entities) {
            updated.push({ id, changes: entity });
        } else {
            added.push(entity);
        }
    }

    return [added, updated];
}

function createUnsortedStateAdapter<T>(selectId: IdSelector<T>): EntityStateAdapter<T> {
    type R = EntityState<T>;

    function addOne<S extends R>(state: S, entity: T): S {
        const key = selectIdValue(entity, selectId);

        if (!(key in state.entities)) {
            state.ids.push(key);
            state.entities[key] = entity;
        }

        return state;
    }

    function addMany<S extends R>(state: S, entities: readonly T[] | Record<string, T>): S {
        const _entities = ensureEntitiesArray(entities);
        _entities.forEach((entity) => addOne(state, entity));

        return state;
    }

    function setOne<S extends R>(state: S, entity: T): S {
        const key = selectIdValue(entity, selectId);

        if (!(key in state.entities)) {
            state.ids.push(key);
        }
        state.entities[key] = entity;

        return state;
    }

    function setMany<S extends R>(state: S, entities: readonly T[] | Record<string, T>): S {
        const _entities = ensureEntitiesArray(entities);
        _entities.forEach((entity) => setOne(state, entity));

        return state;
    }

    function setAll<S extends R>(state: S, entities: readonly T[] | Record<string, T>): S {
        const _entities = ensureEntitiesArray(entities);

        state.ids = [];
        state.entities = {};
        addMany(state, _entities);

        return state;
    }

    function removeMany<S extends R>(state: S, keys: readonly string[]): S {
        let didMutate = false;

        for (const key of keys) {
            if (key in state.entities) {
                delete state.entities[key];
                didMutate = true;
            }
        }

        if (didMutate) {
            state.ids = state.ids.filter((id) => id in state.entities);
        }

        return state;
    }

    function removeOne<S extends R>(state: S, key: string): S {
        return removeMany(state, [key]);
    }

    function removeAll<S extends R>(state: S): S {
        state.ids = [];
        state.entities = {};
        return state;
    }

    function takeNewKey<S extends R>(keys: { [id: string]: string }, update: Update<T>, state: S): boolean {
        const original = state.entities[update.id];
        const updated = <T>{ ...original, ...update.changes };
        const newKey = selectIdValue(updated, selectId);
        const hasNewKey = newKey !== update.id;

        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }

        state.entities[newKey] = updated;

        return hasNewKey;
    }

    function updateMany<S extends R>(state: S, updates: ReadonlyArray<Update<T>>): S {
        const newKeys: { [id: string]: string } = {};

        const updatesPerEntity: { [id: string]: Update<T> } = {};

        for (const update of updates) {
            // Only apply updates to entities that currently exist
            if (update.id in state.entities) {
                // If there are multiple updates to one entity, merge them together
                updatesPerEntity[update.id] = {
                    id: update.id,
                    // Spreads ignore falsy values
                    // so this works even if there isn't an existing update already at this key
                    changes: {
                        ...(updatesPerEntity[update.id] ? updatesPerEntity[update.id].changes : null),
                        ...update.changes,
                    },
                };
            }
        }

        const _updates = Object.values(updatesPerEntity);

        const didMutateEntities = _updates.length > 0;

        if (didMutateEntities) {
            const didMutateIds = _updates.filter((update) => takeNewKey(newKeys, update, state)).length > 0;

            if (didMutateIds) {
                state.ids = state.ids.map((id) => newKeys[id] ?? id);
            }
        }

        return state;
    }

    function updateOne<S extends R>(state: S, update: Update<T>): S {
        return updateMany(state, [update]);
    }

    function upsertMany<S extends R>(state: S, entities: readonly T[] | Record<string, T>): S {
        const [added, updated] = splitAddedUpdatedEntities<T>(state, entities, selectId);

        updateMany(state, updated);
        addMany(state, added);

        return state;
    }

    function upsertOne<S extends R>(state: S, entity: T): S {
        return upsertMany(state, [entity]);
    }

    return {
        addOne,
        addMany,
        setOne,
        setMany,
        setAll,
        removeOne,
        removeMany,
        removeAll,
        updateOne,
        updateMany,
        upsertOne,
        upsertMany,
    } as never;
}

function createSortedStateAdapter<T>(selectId: IdSelector<T>, sort: Comparer<T>): EntityStateAdapter<T> {
    type R = EntityState<T>;

    const { removeOne, removeMany, removeAll } = createUnsortedStateAdapter(selectId);

    function areArraysEqual(a: readonly unknown[], b: readonly unknown[]) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length && i < b.length; i++) {
            if (a[i] === b[i]) continue;
            return false;
        }
        return true;
    }

    function merge(state: R, models: readonly T[]): void {
        // Insert/overwrite all new/updated
        models.forEach((model) => {
            state.entities[selectId(model)] = model;
        });

        const allEntities = Object.values(state.entities) as T[];
        allEntities.sort(sort);

        const sortedIds = allEntities.map(selectId);

        if (!areArraysEqual(state.ids, sortedIds)) {
            state.ids = sortedIds;
        }
    }

    function addMany<S extends R>(state: S, entities: readonly T[] | Record<string, T>): S {
        const _entities = ensureEntitiesArray(entities);

        const models = _entities.filter((model) => !(selectIdValue(model, selectId) in state.entities));
        if (models.length !== 0) {
            merge(state, models);
        }

        return state;
    }

    function addOne<S extends R>(state: S, entity: T): S {
        return addMany(state, [entity]);
    }

    function setMany<S extends R>(state: S, entities: readonly T[] | Record<string, T>): S {
        const _entities = ensureEntitiesArray(entities);
        if (_entities.length !== 0) {
            merge(state, _entities);
        }

        return state;
    }

    function setOne<S extends R>(state: S, entity: T): S {
        return setMany(state, [entity]);
    }

    function setAll<S extends R>(state: S, entities: readonly T[] | Record<string, T>): S {
        const _entities = ensureEntitiesArray(entities);

        state.entities = {};
        state.ids = [];
        addMany(state, _entities);

        return state;
    }

    function takeUpdatedModel(state: R, models: T[], update: Update<T>): boolean {
        if (!(update.id in state.entities)) {
            return false;
        }

        const original = state.entities[update.id];
        const updated = <T>{ ...original, ...update.changes };
        const newKey = selectIdValue(updated, selectId);

        delete state.entities[update.id];

        models.push(updated);

        return newKey !== update.id;
    }

    function updateMany<S extends R>(state: S, updates: ReadonlyArray<Update<T>>): S {
        const models: T[] = [];

        updates.forEach((update) => takeUpdatedModel(state, models, update));

        if (models.length !== 0) {
            merge(state, models);
        }

        return state;
    }

    function updateOne<S extends R>(state: S, update: Update<T>): S {
        return updateMany(state, [update]);
    }

    function upsertMany<S extends R>(state: S, newEntities: readonly T[] | Record<string, T>): S {
        const [added, updated] = splitAddedUpdatedEntities<T>(state, newEntities, selectId);

        updateMany(state, updated);
        addMany(state, added);

        return state;
    }

    function upsertOne<S extends R>(state: S, entity: T): S {
        return upsertMany(state, [entity]);
    }

    return {
        addOne,
        addMany,
        setOne,
        setMany,
        setAll,
        removeOne,
        removeMany,
        removeAll,
        updateOne,
        upsertOne,
        updateMany,
        upsertMany,
    } as never;
}

export function createEntityAdapter<T>(options: Partial<EntityDefinition<T>> = {}): EntityAdapter<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { selectId = (instance: any) => instance.id, sortComparer = false } = options;

    const selectorsFactory = createSelectorsFactory<T>();
    const stateAdapter = sortComparer
        ? createSortedStateAdapter(selectId, sortComparer)
        : createUnsortedStateAdapter(selectId);

    return {
        selectId,
        sortComparer,
        getInitialState: () => ({ ids: [], entities: {} }),
        ...selectorsFactory,
        ...stateAdapter,
    };
}
