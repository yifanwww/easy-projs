/* eslint-disable @typescript-eslint/no-unused-vars */

import { useSelector } from 'react-redux';
import { createEntityAdapter, EntityState } from './createEntityAdapter';

interface Item {
    id: number;
    name: string;
}

interface Store {
    items: EntityState<Item, number>;
}

const adapter = createEntityAdapter({ selectId: (entity: Item) => entity.id });
const initialState = adapter.getInitialState();
const selector = adapter.getSelectors();

const useAll = () => useSelector((state: Store) => selector.selectAll(state.items));
const useEntites = () => useSelector((state: Store) => selector.selectEntities(state.items));
const useIds = () => useSelector((state: Store) => selector.selectIds(state.items));
const useTotal = () => useSelector((state: Store) => selector.selectTotal(state.items));
const useById = (id: number) => useSelector((state: Store) => selector.selectById(state.items, id));
