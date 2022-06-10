/*
 * Modified from https://github.com/reduxjs/redux-toolkit/tree/v1.8.0/packages/toolkit/src/entities
 */

export type IsAny<T, True, False = never> = true | false extends (T extends never ? true : false) ? True : False;
export type PreventAny<TState, TEntity, TId extends EntityId> = IsAny<TState, EntityState<TEntity, TId>, TState>;

export type EntityId = number | string;

export type Comparer<T> = (a: T, b: T) => number;

export type IdSelector<TEntity, TId extends EntityId> = (model: TEntity) => TId;

type Dictionary<TEntity, TId extends EntityId> = {
    [id in TId]?: TEntity;
};

type Entities<TEntity, TId extends EntityId> = readonly TEntity[] | Readonly<Record<TId, TEntity>>;

export type Update<TEntity, TId extends EntityId> = { id: TId; changes: Partial<TEntity> };

export interface EntityState<TEntity, TId extends EntityId> {
    ids: TId[];
    entities: Dictionary<TEntity, TId>;
}

export interface EntityDefinition<TEntity, Id extends EntityId> {
    selectId: IdSelector<TEntity, Id>;
    sortComparer: false | Comparer<TEntity>;
}

export interface EntityStateAdapter<TEntity, TId extends EntityId> {
    addOne<TState extends EntityState<TEntity, TId>>(state: PreventAny<TState, TEntity, TId>, entity: TEntity): TState;
    addMany<TState extends EntityState<TEntity, TId>>(
        state: PreventAny<TState, TEntity, TId>,
        entities: Entities<TEntity, TId>,
    ): TState;
    setOne<TState extends EntityState<TEntity, TId>>(state: PreventAny<TState, TEntity, TId>, entity: TEntity): TState;
    setMany<TState extends EntityState<TEntity, TId>>(
        state: PreventAny<TState, TEntity, TId>,
        entities: Entities<TEntity, TId>,
    ): TState;
    setAll<TState extends EntityState<TEntity, TId>>(
        state: PreventAny<TState, TEntity, TId>,
        entities: Entities<TEntity, TId>,
    ): TState;
    removeOne<TState extends EntityState<TEntity, TId>>(state: PreventAny<TState, TEntity, TId>, key: TId): TState;
    removeMany<TState extends EntityState<TEntity, TId>>(
        state: PreventAny<TState, TEntity, TId>,
        keys: readonly TId[],
    ): TState;
    removeAll<TState extends EntityState<TEntity, TId>>(state: PreventAny<TState, TEntity, TId>): TState;
    updateOne<TState extends EntityState<TEntity, TId>>(
        state: PreventAny<TState, TEntity, TId>,
        update: Update<TEntity, TId>,
    ): TState;
    updateMany<TState extends EntityState<TEntity, TId>>(
        state: PreventAny<TState, TEntity, TId>,
        updates: ReadonlyArray<Update<TEntity, TId>>,
    ): TState;
    upsertOne<TState extends EntityState<TEntity, TId>>(
        state: PreventAny<TState, TEntity, TId>,
        entity: TEntity,
    ): TState;
    upsertMany<TState extends EntityState<TEntity, TId>>(
        state: PreventAny<TState, TEntity, TId>,
        entities: Entities<TEntity, TId>,
    ): TState;
}

export interface EntitySelectors<TState, TEntity, TId extends EntityId> {
    selectIds: (state: TState) => TId[];
    selectEntities: (state: TState) => Dictionary<TEntity, TId>;
    selectAll: (state: TState) => TEntity[];
    selectTotal: (state: TState) => number;
    selectById: (state: TState, id: TId) => TEntity | undefined;
}

export interface EntityAdapter<TEntity, TId extends EntityId> extends EntityStateAdapter<TEntity, TId> {
    selectId: IdSelector<TEntity, TId>;
    sortComparer: false | Comparer<TEntity>;
    getInitialState(): EntityState<TEntity, TId>;
    getSelectors(): EntitySelectors<EntityState<TEntity, TId>, TEntity, TId>;
    getSelectors<TState>(
        selectState: (state: TState) => EntityState<TEntity, TId>,
    ): EntitySelectors<TState, TEntity, TId>;
}

function createSelectorsFactory<TEntity, TId extends EntityId>() {
    type State = EntityState<TEntity, TId>;

    function getSelectors(): EntitySelectors<State, TEntity, TId>;
    function getSelectors<TState>(selectState: (state: TState) => State): EntitySelectors<TState, TEntity, TId>;
    function getSelectors<TState>(
        selectState: (state: TState) => State = (state) => state as never,
    ): EntitySelectors<TState, TEntity, TId> {
        return {
            selectIds: (state) => selectState(state).ids,
            selectEntities: (state) => selectState(state).entities,
            selectAll: (state) => {
                const { entities, ids } = selectState(state);
                return ids.map((id) => <TEntity>entities[id]);
            },
            selectTotal: (state) => selectState(state).ids.length,
            selectById: (state, id) => selectState(state).entities[id],
        };
    }

    return { getSelectors };
}

function selectIdValue<TEntity, TId extends EntityId>(entity: TEntity, selectId: IdSelector<TEntity, TId>): TId {
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

function ensureEntitiesArray<TEntity>(entities: Entities<TEntity, EntityId>): readonly TEntity[] {
    return !Array.isArray(entities) ? Object.values(entities) : entities;
}

function splitAddedUpdatedEntities<TEntity, TId extends EntityId>(
    state: EntityState<TEntity, TId>,
    entities: Entities<TEntity, EntityId>,
    selectId: IdSelector<TEntity, TId>,
): [TEntity[], Update<TEntity, TId>[]] {
    const _entities = ensureEntitiesArray(entities);

    const added: TEntity[] = [];
    const updated: Update<TEntity, TId>[] = [];

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

function createUnsortedStateAdapter<TEntity, TId extends EntityId>(
    selectId: IdSelector<TEntity, TId>,
): EntityStateAdapter<TEntity, TId> {
    type State = EntityState<TEntity, TId>;

    function addOne<TState extends State>(state: TState, entity: TEntity): TState {
        const key = selectIdValue(entity, selectId);

        if (!(key in state.entities)) {
            state.ids.push(key);
            state.entities[key] = entity;
        }

        return state;
    }

    function addMany<TState extends State>(state: TState, entities: Entities<TEntity, TId>): TState {
        const _entities = ensureEntitiesArray(entities);
        _entities.forEach((entity) => addOne(state, entity));

        return state;
    }

    function setOne<TState extends State>(state: TState, entity: TEntity): TState {
        const key = selectIdValue(entity, selectId);

        if (!(key in state.entities)) {
            state.ids.push(key);
        }
        state.entities[key] = entity;

        return state;
    }

    function setMany<TState extends State>(state: TState, entities: Entities<TEntity, TId>): TState {
        const _entities = ensureEntitiesArray(entities);
        _entities.forEach((entity) => setOne(state, entity));

        return state;
    }

    function setAll<TState extends State>(state: TState, entities: Entities<TEntity, TId>): TState {
        const _entities = ensureEntitiesArray(entities);

        state.ids = [];
        state.entities = {};
        addMany(state, _entities);

        return state;
    }

    function removeMany<TState extends State>(state: TState, keys: readonly TId[]): TState {
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

    function removeOne<TState extends State>(state: TState, key: TId): TState {
        return removeMany(state, [key]);
    }

    function removeAll<TState extends State>(state: TState): TState {
        state.ids = [];
        state.entities = {};
        return state;
    }

    function takeNewKey<TState extends State>(
        keys: { [id in TId]?: TId },
        update: Update<TEntity, TId>,
        state: TState,
    ): boolean {
        const original = state.entities[update.id];
        const updated = <TEntity>{ ...original, ...update.changes };
        const newKey = selectIdValue(updated, selectId);
        const hasNewKey = newKey !== update.id;

        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }

        state.entities[newKey] = updated;

        return hasNewKey;
    }

    function updateMany<TState extends State>(state: TState, updates: ReadonlyArray<Update<TEntity, TId>>): TState {
        const newKeys: { [id in TId]?: TId } = {};

        const updatesPerEntity: { [id: EntityId]: Update<TEntity, TId> } = {};

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

    function updateOne<TState extends State>(state: TState, update: Update<TEntity, TId>): TState {
        return updateMany(state, [update]);
    }

    function upsertMany<TState extends State>(state: TState, entities: Entities<TEntity, TId>): TState {
        const [added, updated] = splitAddedUpdatedEntities<TEntity, TId>(state, entities, selectId);

        updateMany(state, updated);
        addMany(state, added);

        return state;
    }

    function upsertOne<TState extends State>(state: TState, entity: TEntity): TState {
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
    type State = EntityState<TEntity, TId>;

    const { removeOne, removeMany, removeAll } = createUnsortedStateAdapter(selectId);

    function areArraysEqual(a: readonly unknown[], b: readonly unknown[]) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length && i < b.length; i++) {
            if (a[i] === b[i]) continue;
            return false;
        }
        return true;
    }

    function merge(state: State, models: readonly TEntity[]): void {
        // Insert/overwrite all new/updated
        models.forEach((model) => {
            state.entities[selectId(model)] = model;
        });

        const allEntities = Object.values(state.entities) as TEntity[];
        allEntities.sort(sort);

        const sortedIds = allEntities.map(selectId);

        if (!areArraysEqual(state.ids, sortedIds)) {
            state.ids = sortedIds;
        }
    }

    function addMany<TState extends State>(state: TState, entities: Entities<TEntity, TId>): TState {
        const _entities = ensureEntitiesArray(entities);

        const models = _entities.filter((model) => !(selectIdValue(model, selectId) in state.entities));
        if (models.length !== 0) {
            merge(state, models);
        }

        return state;
    }

    function addOne<TState extends State>(state: TState, entity: TEntity): TState {
        return addMany(state, [entity]);
    }

    function setMany<TState extends State>(state: TState, entities: Entities<TEntity, TId>): TState {
        const _entities = ensureEntitiesArray(entities);
        if (_entities.length !== 0) {
            merge(state, _entities);
        }

        return state;
    }

    function setOne<TState extends State>(state: TState, entity: TEntity): TState {
        return setMany(state, [entity]);
    }

    function setAll<TState extends State>(state: TState, entities: Entities<TEntity, TId>): TState {
        const _entities = ensureEntitiesArray(entities);

        state.entities = {};
        state.ids = [];
        addMany(state, _entities);

        return state;
    }

    function takeUpdatedModel(state: State, models: TEntity[], update: Update<TEntity, TId>): boolean {
        if (!(update.id in state.entities)) {
            return false;
        }

        const original = state.entities[update.id];
        const updated = <TEntity>{ ...original, ...update.changes };
        const newKey = selectIdValue(updated, selectId);

        delete state.entities[update.id];

        models.push(updated);

        return newKey !== update.id;
    }

    function updateMany<TState extends State>(state: TState, updates: ReadonlyArray<Update<TEntity, TId>>): TState {
        const models: TEntity[] = [];

        updates.forEach((update) => takeUpdatedModel(state, models, update));

        if (models.length !== 0) {
            merge(state, models);
        }

        return state;
    }

    function updateOne<TState extends State>(state: TState, update: Update<TEntity, TId>): TState {
        return updateMany(state, [update]);
    }

    function upsertMany<TState extends State>(state: TState, newEntities: Entities<TEntity, TId>): TState {
        const [added, updated] = splitAddedUpdatedEntities<TEntity, TId>(state, newEntities, selectId);

        updateMany(state, updated);
        addMany(state, added);

        return state;
    }

    function upsertOne<TState extends State>(state: TState, entity: TEntity): TState {
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

export function createEntityAdapter<TEntity, TId extends EntityId>(
    options: Partial<EntityDefinition<TEntity, TId>> = {},
): EntityAdapter<TEntity, TId> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { selectId = (instance: any) => instance.id, sortComparer = false } = options;

    const selectorsFactory = createSelectorsFactory<TEntity, TId>();
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
