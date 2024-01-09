import { useState } from 'react';

import style from '../styles/Explore.module.css';
import Sidebar from './explore/Sidebar';
import Results from './Results';
import Home from '../page';
import { Movie } from '@mui/icons-material';

export default function Explore({ toggleFilter, userData, setUserData, handleTabChange }) {
  const [resultsKey, setResultsKey] = useState(1); // Start counting at 1
  const [activeView, setActiveView] = useState('Top Rated');
  const [yearRequested, setYearRequested] = useState(null);

  const resultsLength = 20;

  const handleMain = (selectedView) => {
    setActiveView(selectedView);
    setResultsKey(resultsKey + 1);
  };

const handleQueryByYear = (year) => {
  setYearRequested(year);
  console.log('Year requested:', year);
  handleMain('Year');
};

  const renderContent = () => {
    if (activeView === 'Now Playing') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute="/movies/now-playing"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Popular') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute="/movies/popular"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Top Rated') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute="/movies/top-rated"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Upcoming') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute="/movies/upcoming"
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          handleTabChange={handleTabChange}
        />
      );
    } else if (activeView === 'Year') {
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute={`/movies/discover/year/${yearRequested}`}
          toggleFilter={toggleFilter}
          userData={userData}
          setUserData={setUserData}
          handleTabChange={handleTabChange}
        />
      );
    }
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <Sidebar handleMain={handleMain} handleQueryByYear={handleQueryByYear}/>
      </div>
      <div className={style.main}>
        {renderContent()}
      </div>
    </div>
  );  
}

