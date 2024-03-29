import { useState } from 'react';

import style from '../styles/Explore.module.css';
import Sidebar from './explore/Sidebar';
import Results from './Results';

export default function Explore({ toggleFilter, userData, removeUserData, handleTabChange, setUserData }) {
  const [resultsKey, setResultsKey] = useState(1); // Start counting at 1
  const [activeView, setActiveView] = useState('Popular');
  const [yearRequested, setYearRequested] = useState(null);
  const [genreRequested, setGenreRequested] = useState(null);
  const [ratingRequested, setRatingRequested] = useState(5);

  const resultsLength = 20;

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
          resultsLength={resultsLength}
          resultsRoute="/movies/now-playing/"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          removeUserData={removeUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Popular') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute="/movies/popular/"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          removeUserData={removeUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Top Rated') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute="/movies/top-rated/"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          removeUserData={removeUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Upcoming') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute="/movies/upcoming/"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          removeUserData={removeUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Year') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute={`/movies/discover/year/${yearRequested}/`}
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          removeUserData={removeUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Genre') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute={`/movies/discover/genre/${genreRequested}/`}
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          removeUserData={removeUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Rating') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute={`/movies/discover/rating/${ratingRequested}/`}
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          removeUserData={removeUserData}
          handleTabChange={handleTabChange}
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

