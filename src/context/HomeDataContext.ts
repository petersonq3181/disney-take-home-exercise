import { createContext, useContext } from 'react';
import { HomeData } from '../types/types';

interface HomeDataContextValue {
  data: HomeData | null;
  error: string | null;
}

export const HomeDataContext = createContext<HomeDataContextValue>({
  data: null,
  error: null,
});

// custom hook 
export const useHomeData = () => useContext(HomeDataContext);
