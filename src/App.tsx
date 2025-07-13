import React, { useEffect, useMemo, useState } from 'react';
import Home from './components/Home';
import { HomeData } from './types/types';
import { HomeDataContext } from './context/HomeDataContext';
import { fetchHomeData } from './utils/utils';
import './App.css';

function App() {
  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHomeData()
      .then((json) => {
        const typedJson = json as HomeData; 
        setData(typedJson); 
        (window as any).homeData = typedJson;  // temp
      })
      .catch((err) => setError(err.message));
  }, []);

  const contextValue = useMemo(
    () => ({ data, error }),
    [data, error]
  );

  return (
    <div className="app-wrapper">
      <div className="app-fixed">
        <HomeDataContext.Provider value={contextValue}>
          <Home />
        </HomeDataContext.Provider>
      </div>
    </div>
  );
}

export default App;
