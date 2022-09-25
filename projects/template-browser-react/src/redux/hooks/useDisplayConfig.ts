import { useReduxSelector } from './useReduxSelector';

export const useClientAreaSize = () => useReduxSelector((state) => state.displayConfig.clientAreaSize);
