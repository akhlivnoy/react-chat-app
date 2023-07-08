import { useLocation } from 'react-router-dom';

export const useLocationState = <T>() => useLocation().state as T;
