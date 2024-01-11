'use client'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import style from './page.module.css';
import handleLogout from './utils/handleLogout';
import setAuthToken from './utils/setAuthToken';


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
  const [isThereLocalStorage, setIsThereLocalStorage] = useState(null)

  function mergeObjects(obj1, obj2) {
    const result = { ...obj1 };
    for (const key in obj2) {
      if (!result.hasOwnProperty(key)) {
        result[key] = obj2[key];
      }
    }
    return result;
  }

  useEffect(() => { 
    setIsThereLocalStorage(!!window.localStorage)
    console.log('useEffect 1 running')
  }, []);

  useEffect(() => {
    console.log('useEffect 2 running')
  }, [isFilterVisible]);

  useEffect(() => {
    if (!userData && isThereLocalStorage) {
      if (localStorage.getItem('jwtToken')) {
        console.log('token but no data so we are fixing that')
        setAuthToken(localStorage.getItem('jwtToken'));
        const userData = axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/refreshData/${localStorage.getItem('email')}`)
          .then((response) => {
            console.log('response', response)
            handleUserData(response.data);
          })
          .catch((error) => {
            console.log('error2', error);
            handleLogout();
            handleTabChange('Home');
          });
      } else {
        handleTabChange('Home');
      }
    } else if (!userData && !localStorage.getItem('jwtToken')) {
      console.log('no token and no data, redirecting to "Homepage"')
      handleTabChange('Home');
    } else {
      console.log('token and data are both ready to go')
    }
  }, [userData, activeView]);

  const toggleFilter = () => {
    setIsFilterVisible((prevVisible) => !prevVisible);
    setFilterKey((prevKey) => prevKey + 1);
  };

  const handleUserData = (userData) => {
    setUserData(userData);
  };

  const removeUserData = () => {
    setUserData(null);
  };

  const handleTabChange = (selectedTab) => {
    setActiveView(selectedTab);
    setResultsKey((prevKey) => prevKey + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setActiveView('Search');
    setResultsKey((prevKey) => prevKey + 1);
  };

  const searchProps = { resultsLength, toggleFilter, userData, searchQuery, resultsRoute: `/movies/search/${searchQuery}/`, setUserData, handleTabChange};
  const exploreProps = { toggleFilter, userData, removeUserData, handleTabChange, setUserData };
  const homepageProps = { handleTabChange, handleUserData, setUserData, userData };
  const accountProps = { handleUserData, handleTabChange, userData };
  
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