'use client'
import 'bulma/css/bulma.min.css';
import style from './page.module.css';
import { useState } from 'react';
import setAuthToken from './utils/setAuthToken';
import Results from './components/Results';
import Nav from './components/Nav';
import MovieDetails from './components/MovieDetails';
import Homepage from './components/Homepage';
import { Movie } from '@mui/icons-material';

export default function Home() {
  let movieId = 11;

  // tabs item click handler
  const [activeView, setActiveView] = useState('Homepage');
  const [searchQuery, setSearchQuery] = useState(''); // Default value is empty string
  const [resultsKey, setResultsKey] = useState(1); // Start counting at 1
  const [resultsLength, setResultsLength] = useState(10); // Default value is 10

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
        />
      );
    } else {
      if (activeView === 'Now Playing') {
        return (
          <Results
            key={resultsKey}
            resultsLength={resultsLength}
            resultsRoute="/movies/now-playing"
          />
        );
      } else if (activeView === 'Popular') {
        return (
          <Results
            key={resultsKey}
            resultsLength={resultsLength}
            resultsRoute="/movies/popular"
          />
        );
      } else if (activeView === 'Recommended') {
        return (
          <Results
            key={resultsKey}
            resultsLength={resultsLength}
            resultsRoute={`/movies/movie/${movieId}/recommendations`}
          />
        );
      } else if  (activeView === 'MovieDetails') {
        return (
          <MovieDetails />
        );
      } else if (activeView === 'Homepage') {
        return (
          <Homepage />
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
        <div className={style.banner}>
          <h3 className={style.title}>
            {searchQuery
              ? `Search results for '${searchQuery}'`
              : activeView === 'Now Playing'
              ? 'Now Playing'
              : activeView === 'Popular'
              ? 'Popular'
              : activeView === 'MovieDetails'
              ? 'Movie Details'
              : activeView === 'Recommended'
              ? 'Recommended'
              : ''}
          </h3>
          <div className={style.resultsLengthMenu}>
            <span className={style.resultsLabel}>Results Length </span>
            <select
              value={resultsLength}
              onChange={(e) => handleResultsLengthChange(parseInt(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
          <hr />
        {renderContent()}
      </div>
    </main>
  );
}
