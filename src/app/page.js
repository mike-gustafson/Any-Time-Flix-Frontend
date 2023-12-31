'use client'
import style from './page.module.css';
import { useReducer } from 'react';
import { useState, useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';

// Components
import Nav from './components/Nav';
import Explore from './components/Explore';
import Results from './components/Results';
import Homepage from './components/Homepage';

export default function Home() {


  // tabs item click handler
  const [activeView, setActiveView] = useState('Home');
  const [searchQuery, setSearchQuery] = useState(''); // Default value is empty string
  const [resultsKey, setResultsKey] = useState(1); // Start counting at 1
  const [resultsLength, setResultsLength] = useState(10); // Default value is 10
  const [filterKey, setFilterKey] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);



  const toggleFilter = () => {
    setIsFilterVisible(prevVisible => !prevVisible);
    setFilterKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
  }, [isFilterVisible]);

  const handleTabChange = (selectedTab) => {
    setActiveView(selectedTab);
    setResultsKey(resultsKey + 1);
    clearSearchQuery();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setResultsKey(resultsKey + 1);
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  // render content based on active tab or search
  const renderContent = () => {
    if (searchQuery) {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute={`/movies/search/${searchQuery}`}
          toggleFilter={toggleFilter}
        />
      );
    } else {
      if (activeView === 'Home') {
        return (
          <Homepage />
        );
      } else if (activeView === 'Account') {
        return (
          <div>
            <h1>Account</h1>
          </div>
        );
      } else if (activeView === 'Explore') {
        return (
          <Explore toggleFilter={toggleFilter} />
        );
      }
    }
  };

  return (
    <main className={style.wrapper}>
      <div key={filterKey} className={isFilterVisible ? style.dimmingOverlayVisible : style.dimmingOverlayHidden}>
      </div>
      <Nav handleTabChange={handleTabChange} handleSearch={handleSearch} />
      <div className={style.main}>
        {renderContent()}
      </div>
    </main>
  );
}
