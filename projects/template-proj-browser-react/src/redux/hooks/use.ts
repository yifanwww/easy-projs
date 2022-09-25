import { useReduxSelector } from './useReduxSelector';

export const usePrepared = () => useReduxSelector((state) => state.prepared);
