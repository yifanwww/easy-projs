import { useLocation } from 'react-router';

export const usePageURL = () => useLocation().pathname;
