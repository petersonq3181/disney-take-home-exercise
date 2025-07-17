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
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="app-wrapper">
      <div className="app-fixed">
        <HomeDataContext.Provider value={{data, error}}>
          <Home />
        </HomeDataContext.Provider>
      </div>
    </div>
  );
}

export default App;
