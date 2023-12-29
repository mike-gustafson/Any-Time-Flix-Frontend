'use client'
import style from './page.module.css';
import { useState } from 'react';
import setAuthToken from './utils/setAuthToken';

// Components
import Results from './components/Results';
import Nav from './components/Nav';
import MovieDetails from './components/MovieDetails';
import Homepage from './components/Homepage';
import Explore from './components/Explore';

export default function Home() {
  let movieId = 11;

  // tabs item click handler
  const [activeView, setActiveView] = useState('Home');
  const [searchQuery, setSearchQuery] = useState(''); // Default value is empty string
  const [resultsKey, setResultsKey] = useState(1); // Start counting at 1
  const [resultsLength, setResultsLength] = useState(10); // Default value is 10
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  }

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

  const handleResultsLengthChange = (length) => {
    setResultsLength(length);
    setResultsKey(resultsKey + 1);
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
          <Explore />
        );
      }
    }
  };

  return (
    <main className={style.wrapper}>  
    <div className={{ visibility: isFilterVisible ? 'visible' : 'hidden', ...style.dimmingOverlay}}> 
    </div>
        <Nav handleTabChange={handleTabChange} handleSearch={handleSearch} />
      <div className={style.main}>
        {renderContent()}
      </div>
    </main>
  );
}
