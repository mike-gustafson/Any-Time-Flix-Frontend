'use client'
import style from './page.module.css';
import React, { useState, useEffect } from 'react';

import Nav from './components/Nav';
import Account from './components/Account';
import Explore from './components/Explore';
import Results from './components/Results';
import Homepage from './components/Homepage';

export default function Home() {
  const [activeView, setActiveView] = useState('Homepage');
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsKey, setResultsKey] = useState(1);
  const [resultsLength, setResultsLength] = useState(20);
  const [filterKey, setFilterKey] = useState(0);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [userData, setUserData] = useState(null);


  const toggleFilter = () => {
    setIsFilterVisible((prevVisible) => !prevVisible);
    setFilterKey((prevKey) => prevKey + 1);
  };

  const handleUserData = (data) => setUserData(data);

  useEffect(() => {}, [isFilterVisible]);

  const handleTabChange = (selectedTab) => {
    setActiveView(selectedTab);
    setResultsKey((prevKey) => prevKey + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveView('Search');
    setResultsKey((prevKey) => prevKey + 1);
  };

  const searchProps = { resultsLength, toggleFilter, userData, searchQuery, resultsRoute: `/movies/search/${searchQuery}`};
  const exploreProps = { toggleFilter, userData, setUserData, handleTabChange };
  const homepageProps = { handleTabChange, handleUserData, setUserData };
  const accountProps = { handleUserData, handleTabChange };
  
  const views = {
    Homepage: { component: Homepage, props: homepageProps },
    Account: { component: Account, props: accountProps },
    Explore: { component: Explore, props: exploreProps },
    Search: { component: Results, props: searchProps },
  };
  
  const displayActiveView = () => {
    const { component: Component, props } = views[activeView] || views.Homepage;
    return <Component {...props} key={resultsKey} />;
  };
  

  return (
    <main className={style.wrapper}>
      <div key={filterKey} className={isFilterVisible ? style.dimmingOverlayVisible : style.dimmingOverlayHidden} />
      <Nav handleTabChange={handleTabChange} handleSearch={handleSearch} />
      <div className={style.main}>
        {displayActiveView()}
      </div>
    </main>
  );
}