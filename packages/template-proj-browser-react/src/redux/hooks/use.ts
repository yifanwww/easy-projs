import { useMainSelector } from './useMainSelector';

export const usePrepared = () => useMainSelector((state) => state.prepared);
