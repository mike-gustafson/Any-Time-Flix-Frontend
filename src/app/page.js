'use client'
import 'bulma/css/bulma.min.css';
import style from './page.module.css';
import { useState } from 'react';
import setAuthToken from './utils/setAuthToken';
import Results from './components/Results';
import Nav from './components/Nav';

export default function Home() {
  let movieId = 11;

  // tabs item click handler
  const [activeView, setActiveView] = useState('Now Playing');
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsKey, setResultsKey] = useState(1);

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
          resultsLength={20}
          resultsRoute={`/movies/search/${searchQuery}`}
        />
      );
    } else {
      if (activeView === 'Now Playing') {
        return (
          <Results
            key={resultsKey}
            resultsLength={14}
            resultsRoute="/movies/now-playing"
          />
        );
      } else if (activeView === 'Popular') {
        return (
          <Results
            key={resultsKey}
            resultsLength={10}
            resultsRoute="/movies/popular"
          />
        );
      } else if (activeView === 'Recommended') {
        return (
          <Results
            key={resultsKey}
            resultsLength={7}
            resultsRoute={`/movies/movie/${movieId}/recommendations`}
          />
        );
      }
    }
  };

  return (
    <main className={style.wrapper}>
      <div className={style.navBar}>
        <Nav handleTabChange={handleTabChange} handleSearch={handleSearch} />
      </div>
      <div className={style.main}>
        <h3 className={style.sectionTitle}>
          {searchQuery
            ? `Search results for '${searchQuery}'`
            : activeView === 'Now Playing'
            ? 'Now Playing'
            : activeView === 'Popular'
            ? 'Popular'
            : activeView === 'Recommended'
            ? 'Recommended'
            : ''}
        </h3>
        {renderContent()}
      </div>
    </main>
  );
}
