/*
 * Modified from https://github.com/reduxjs/redux-toolkit/tree/v1.8.0/packages/toolkit/src/entities
 */

export type IsAny<T, True, False = never> = true | false extends (T extends never ? true : false) ? True : False;
export type PreventAny<State, Entity, Id extends EntityId> = IsAny<State, EntityState<Entity, Id>, State>;

export type EntityId = number | string;

export type Comparer<T> = (a: T, b: T) => number;

export type IdSelector<Entity, Id extends EntityId> = (model: Entity) => Id;

type Dictionary<Entity, Id extends EntityId> = {
    [id in Id]?: Entity;
};

type Entities<Entity, Id extends EntityId> = readonly Entity[] | Readonly<Record<Id, Entity>>;

export type Update<Entity, Id extends EntityId> = { id: Id; changes: Partial<Entity> };

export interface EntityState<Entity, Id extends EntityId> {
    ids: Id[];
    entities: Dictionary<Entity, Id>;
}

export interface EntityDefinition<Entity, Id extends EntityId> {
    selectId: IdSelector<Entity, Id>;
    sortComparer: false | Comparer<Entity>;
}

export interface EntityStateAdapter<Entity, Id extends EntityId> {
    addOne<State extends EntityState<Entity, Id>>(state: PreventAny<State, Entity, Id>, entity: Entity): State;
    addMany<State extends EntityState<Entity, Id>>(
        state: PreventAny<State, Entity, Id>,
        entities: Entities<Entity, Id>,
    ): State;
    setOne<State extends EntityState<Entity, Id>>(state: PreventAny<State, Entity, Id>, entity: Entity): State;
    setMany<State extends EntityState<Entity, Id>>(
        state: PreventAny<State, Entity, Id>,
        entities: Entities<Entity, Id>,
    ): State;
    setAll<State extends EntityState<Entity, Id>>(
        state: PreventAny<State, Entity, Id>,
        entities: Entities<Entity, Id>,
    ): State;
    removeOne<State extends EntityState<Entity, Id>>(state: PreventAny<State, Entity, Id>, key: Id): State;
    removeMany<State extends EntityState<Entity, Id>>(state: PreventAny<State, Entity, Id>, keys: readonly Id[]): State;
    removeAll<State extends EntityState<Entity, Id>>(state: PreventAny<State, Entity, Id>): State;
    updateOne<State extends EntityState<Entity, Id>>(
        state: PreventAny<State, Entity, Id>,
        update: Update<Entity, Id>,
    ): State;
    updateMany<State extends EntityState<Entity, Id>>(
        state: PreventAny<State, Entity, Id>,
        updates: ReadonlyArray<Update<Entity, Id>>,
    ): State;
    upsertOne<State extends EntityState<Entity, Id>>(state: PreventAny<State, Entity, Id>, entity: Entity): State;
    upsertMany<State extends EntityState<Entity, Id>>(
        state: PreventAny<State, Entity, Id>,
        entities: Entities<Entity, Id>,
    ): State;
}

export interface EntitySelectors<State, Entity, Id extends EntityId> {
    selectIds: (state: State) => Id[];
    selectEntities: (state: State) => Dictionary<Entity, Id>;
    selectAll: (state: State) => Entity[];
    selectTotal: (state: State) => number;
    selectById: (state: State, id: Id) => Entity | undefined;
}

export interface EntityAdapter<Entity, Id extends EntityId> extends EntityStateAdapter<Entity, Id> {
    selectId: IdSelector<Entity, Id>;
    sortComparer: false | Comparer<Entity>;
    getInitialState(): EntityState<Entity, Id>;
    getSelectors(): EntitySelectors<EntityState<Entity, Id>, Entity, Id>;
    getSelectors<State>(selectState: (state: State) => EntityState<Entity, Id>): EntitySelectors<State, Entity, Id>;
}

function createSelectorsFactory<Entity, Id extends EntityId>() {
    function getSelectors(): EntitySelectors<EntityState<Entity, Id>, Entity, Id>;
    function getSelectors<State>(
        selectState: (state: State) => EntityState<Entity, Id>,
    ): EntitySelectors<State, Entity, Id>;
    function getSelectors<TState>(
        selectState: (state: TState) => EntityState<Entity, Id> = (state) => state as never,
    ): EntitySelectors<TState, Entity, Id> {
        return {
            selectIds: (state) => selectState(state).ids,
            selectEntities: (state) => selectState(state).entities,
            selectAll: (state) => {
                const { entities, ids } = selectState(state);
                return ids.map((id) => <Entity>entities[id]);
            },
            selectTotal: (state) => selectState(state).ids.length,
            selectById: (state, id) => selectState(state).entities[id],
        };
    }

    return { getSelectors };
}

function selectIdValue<Entity, Id extends EntityId>(entity: Entity, selectId: IdSelector<Entity, Id>): Id {
    const key = selectId(entity);

    if (process.env.NODE_ENV !== 'production' && key === undefined) {
        // eslint-disable-next-line no-console
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

function ensureEntitiesArray<Entity>(entities: Entities<Entity, EntityId>): readonly Entity[] {
    return !Array.isArray(entities) ? Object.values(entities) : entities;
}

function splitAddedUpdatedEntities<Entity, Id extends EntityId>(
    state: EntityState<Entity, Id>,
    entities: Entities<Entity, EntityId>,
    selectId: IdSelector<Entity, Id>,
): [Entity[], Update<Entity, Id>[]] {
    const _entities = ensureEntitiesArray(entities);

    const added: Entity[] = [];
    const updated: Update<Entity, Id>[] = [];

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

function createUnsortedStateAdapter<Entity, Id extends EntityId>(
    selectId: IdSelector<Entity, Id>,
): EntityStateAdapter<Entity, Id> {
    type StateType = EntityState<Entity, Id>;

    function addOne<State extends StateType>(state: State, entity: Entity): State {
        const key = selectIdValue(entity, selectId);

        if (!(key in state.entities)) {
            state.ids.push(key);
            state.entities[key] = entity;
        }

        return state;
    }

    function addMany<State extends StateType>(state: State, entities: Entities<Entity, Id>): State {
        const _entities = ensureEntitiesArray(entities);
        _entities.forEach((entity) => addOne(state, entity));

        return state;
    }

    function setOne<State extends StateType>(state: State, entity: Entity): State {
        const key = selectIdValue(entity, selectId);

        if (!(key in state.entities)) {
            state.ids.push(key);
        }
        state.entities[key] = entity;

        return state;
    }

    function setMany<State extends StateType>(state: State, entities: Entities<Entity, Id>): State {
        const _entities = ensureEntitiesArray(entities);
        _entities.forEach((entity) => setOne(state, entity));

        return state;
    }

    function setAll<State extends StateType>(state: State, entities: Entities<Entity, Id>): State {
        const _entities = ensureEntitiesArray(entities);

        state.ids = [];
        state.entities = {};
        addMany(state, _entities);

        return state;
    }

    function removeMany<State extends StateType>(state: State, keys: readonly Id[]): State {
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

    function removeOne<State extends StateType>(state: State, key: Id): State {
        return removeMany(state, [key]);
    }

    function removeAll<State extends StateType>(state: State): State {
        state.ids = [];
        state.entities = {};
        return state;
    }

    function takeNewKey<State extends StateType>(
        keys: { [id in Id]?: Id },
        update: Update<Entity, Id>,
        state: State,
    ): boolean {
        const original = state.entities[update.id];
        const updated = <Entity>{ ...original, ...update.changes };
        const newKey = selectIdValue(updated, selectId);
        const hasNewKey = newKey !== update.id;

        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }

        state.entities[newKey] = updated;

        return hasNewKey;
    }

    function updateMany<State extends StateType>(state: State, updates: ReadonlyArray<Update<Entity, Id>>): State {
        const newKeys: { [id in Id]?: Id } = {};

        const updatesPerEntity: { [id: EntityId]: Update<Entity, Id> } = {};

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
                state.ids = Array.from(new Set(state.ids.map((id) => newKeys[id] ?? id)));
            }
        }

        return state;
    }

    function updateOne<State extends StateType>(state: State, update: Update<Entity, Id>): State {
        return updateMany(state, [update]);
    }

    function upsertMany<State extends StateType>(state: State, entities: Entities<Entity, Id>): State {
        const [added, updated] = splitAddedUpdatedEntities<Entity, Id>(state, entities, selectId);

        updateMany(state, updated);
        addMany(state, added);

        return state;
    }

    function upsertOne<State extends StateType>(state: State, entity: Entity): State {
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

function createSortedStateAdapter<TEntity, TId extends EntityId>(
    selectId: IdSelector<TEntity, TId>,
    sort: Comparer<TEntity>,
): EntityStateAdapter<TEntity, TId> {
    type StateType = EntityState<TEntity, TId>;

    const { removeOne, removeMany, removeAll } = createUnsortedStateAdapter(selectId);

    function areArraysEqual(a: readonly unknown[], b: readonly unknown[]) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length && i < b.length; i++) {
            if (a[i] === b[i]) continue;
            return false;
        }
        return true;
    }

    function resortEntities(state: StateType): void {
        const allEntities = Object.values(state.entities) as TEntity[];
        allEntities.sort(sort);

        const sortedIds = allEntities.map(selectId);

        if (!areArraysEqual(state.ids, sortedIds)) {
            state.ids = sortedIds;
        }
    }

    function merge(state: StateType, models: readonly TEntity[]): void {
        // Insert/overwrite all new/updated
        models.forEach((model) => {
            state.entities[selectId(model)] = model;
        });

        resortEntities(state);
    }

    function addMany<State extends StateType>(state: State, entities: Entities<TEntity, TId>): State {
        const _entities = ensureEntitiesArray(entities);

        const models = _entities.filter((model) => !(selectIdValue(model, selectId) in state.entities));
        if (models.length !== 0) {
            merge(state, models);
        }

        return state;
    }

    function addOne<State extends StateType>(state: State, entity: TEntity): State {
        return addMany(state, [entity]);
    }

    function setMany<State extends StateType>(state: State, entities: Entities<TEntity, TId>): State {
        const _entities = ensureEntitiesArray(entities);
        if (_entities.length !== 0) {
            merge(state, _entities);
        }

        return state;
    }

    function setOne<State extends StateType>(state: State, entity: TEntity): State {
        return setMany(state, [entity]);
    }

    function setAll<State extends StateType>(state: State, entities: Entities<TEntity, TId>): State {
        const _entities = ensureEntitiesArray(entities);

        state.entities = {};
        state.ids = [];
        addMany(state, _entities);

        return state;
    }

    function updateMany<State extends StateType>(state: State, updates: ReadonlyArray<Update<TEntity, TId>>): State {
        let appliedUpdates = false;

        for (const update of updates) {
            const entity = state.entities[update.id];
            if (!entity) continue;

            appliedUpdates = true;

            Object.assign(entity, update.changes);

            const newId = selectId(entity);
            if (update.id !== newId) {
                delete state.entities[update.id];
                state.entities[newId] = entity;
            }
        }

        if (appliedUpdates) {
            resortEntities(state);
        }

        return state;
    }

    function updateOne<State extends StateType>(state: State, update: Update<TEntity, TId>): State {
        return updateMany(state, [update]);
    }

    function upsertMany<State extends StateType>(state: State, newEntities: Entities<TEntity, TId>): State {
        const [added, updated] = splitAddedUpdatedEntities<TEntity, TId>(state, newEntities, selectId);

        updateMany(state, updated);
        addMany(state, added);

        return state;
    }

    function upsertOne<State extends StateType>(state: State, entity: TEntity): State {
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

export function createEntityAdapter<Entity, Id extends EntityId>(
    options: Partial<EntityDefinition<Entity, Id>> = {},
): EntityAdapter<Entity, Id> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { selectId = (instance: any) => instance.id, sortComparer = false } = options;

    const selectorsFactory = createSelectorsFactory<Entity, Id>();
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
