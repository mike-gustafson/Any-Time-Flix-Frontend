import { useState } from 'react';

import style from '../styles/Explore.module.css';
import Sidebar from './explore/Sidebar';
import Results from './Results';

export default function Explore({ toggleFilter, userData, setUserData }) {
  const [resultsKey, setResultsKey] = useState(1); // Start counting at 1
  const [activeView, setActiveView] = useState('Popular');
  const [yearRequested, setYearRequested] = useState(null);
  const [genreRequested, setGenreRequested] = useState(null);
  const [ratingRequested, setRatingRequested] = useState(5);

  const handleMain = (selectedView) => {
    setActiveView(selectedView);
    setResultsKey(resultsKey + 1);
  };

  const handleQueryByGenre = (genre) => {
    setGenreRequested(genre);
    handleMain('Genre');
  };

  const handleQueryByYear = (year) => {
    setYearRequested(year);
    handleMain('Year');
  };

  const handleQueryByRating = (rating) => {
    setRatingRequested(rating);
    handleMain('Rating');
  };

  const renderContent = () => {
    if (activeView === 'Now Playing') {
      return (
        <Results
          key={resultsKey}
          resultsRoute="/movies/now-playing/"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
        />
      );
    } else if (activeView === 'Popular') {
      return (
        <Results
          key={resultsKey}
          resultsRoute="/movies/popular/"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
        />
      );
    } else if (activeView === 'Top Rated') {
      return (
        <Results
          key={resultsKey}
          resultsRoute="/movies/top-rated/"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
        />
      );
    } else if (activeView === 'Upcoming') {
      return (
        <Results
          key={resultsKey}
          resultsRoute="/movies/upcoming/"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
        />
      );
    } else if (activeView === 'Year') {
      return (
        <Results
          key={resultsKey}
          resultsRoute={`/movies/discover/year/${yearRequested}/`}
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
        />
      );
    } else if (activeView === 'Genre') {
      return (
        <Results
          key={resultsKey}
          resultsRoute={`/movies/discover/genre/${genreRequested}/`}
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
        />
      );
    } else if (activeView === 'Rating') {
      return (
        <Results
          key={resultsKey}
          resultsRoute={`/movies/discover/rating/${ratingRequested}/`}
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
        />
      );
    }
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <Sidebar handleMain={handleMain} handleQueryByYear={handleQueryByYear} handleQueryByGenre={handleQueryByGenre} handleQueryByRating={handleQueryByRating}/>
      </div>
      <div className={style.main}>
        {renderContent()}
      </div>
    </div>
  );  
}

