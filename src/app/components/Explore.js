import { useState } from 'react';
import style from '../styles/Explore.module.css';
import Sidebar from './explore/Sidebar';
import Results from './Results';

export default function Explore({ toggleFilter, userData, setUserData }) {
  const [resultsKey, setResultsKey] = useState(1);
  const [activeView, setActiveView] = useState('Popular');
  const [findByQuery, setFindByQuery] = useState(null);

  const handleMain = (selectedView) => {
    setActiveView(selectedView); // set activeView in state
    setResultsKey(resultsKey + 1); // this is a hack to force the Results component to re-render when the activeView changes
  };

  const handleFindByQuery = (query, view) => {
    setFindByQuery(query);
    setActiveView(view);
    setResultsKey(resultsKey + 1);
  }

  const renderContent = () => {
    const resultsRouteMap = {
      'Now Playing': '/movies/now-playing/',
      Popular: '/movies/popular/',
      'Top Rated': '/movies/top-rated/',
      Upcoming: '/movies/upcoming/',
      Year: `/movies/discover/year/${findByQuery}/`,
      Genre: `/movies/discover/genre/${findByQuery}/`,
      Rating: `/movies/discover/rating/${findByQuery}/`,
    };

    return (
      <Results
        key={resultsKey}
        resultsRoute={resultsRouteMap[activeView]}
        toggleFilter={toggleFilter}
        userData={userData}
        setUserData={setUserData}
      />
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