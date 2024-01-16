import { useState } from 'react';
import style from '../styles/Explore.module.css';
import Sidebar from './explore/Sidebar';
import Results from './Results';

export default function Explore({ toggleFilter, userData, setUserData, handleModalClose, handleModalOpen }) {

  const [resultsKey, setResultsKey] = useState(1);
  const [activeView, setActiveView] = useState('Popular');
  const [findByQuery, setFindByQuery] = useState(null);

  const resultsRouteMap = { //note that these don't include the page
    'Now Playing': '/movies/now-playing/',
    Popular: '/movies/popular/',
    'Top Rated': '/movies/top-rated/',
    Upcoming: '/movies/upcoming/',
    Year: `/movies/discover/year/${findByQuery}/`,
    Genre: `/movies/discover/genre/${findByQuery}/`,
    Rating: `/movies/discover/rating/${findByQuery}/`,
  };

  const resultsHooksAndProps = {
    resultsRoute: resultsRouteMap[activeView],
    toggleFilter: toggleFilter,
    userData: userData,
    setUserData: setUserData,
    handleModalClose: handleModalClose, 
    handleModalOpen: handleModalOpen
  }
  
  const handleMain = (selectedView) => {
    setActiveView(selectedView); // set activeView in state
  };

  const handleFindByQuery = (query, view) => {
    setFindByQuery(query);
    setActiveView(view);
  }

  const renderContent = () => {

    return (
      <Results {...resultsHooksAndProps} />
    );
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <Sidebar
          handleMain={handleMain} // handles the main view
          handleFindByQuery={handleFindByQuery} // handles the query views
        />
      </div>
      <div className={style.main}>{renderContent()}</div>
    </div>
  );
}