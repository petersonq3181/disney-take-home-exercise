import React, { useEffect, useMemo, useState } from 'react';
import Home from './components/Home';
import { HomeData } from './types/types';
import { HomeDataContext } from './context/HomeDataContext';
import { fetchHomeData } from './utils/fetchHomeData';
import './App.css';

function App() {
  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomeData()
      .then((json) => {
        setData(json);
      })
      .catch((err) => setError(err.message));
  }, []);

  const contextValue = useMemo(
    () => ({ data, error }),
    [data, error]
  );

  return (
    <HomeDataContext.Provider value={contextValue}>
      <Home />
    </HomeDataContext.Provider>
  );
}

export default App;
