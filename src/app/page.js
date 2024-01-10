'use client'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import style from './page.module.css';
import handleLogout from '@/app/utils/handleLogout';
import setAuthToken from '@/app/utils/setAuthToken';

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
    // Check if localStorage is available and set isThereLocalStorage accordingly
    setIsThereLocalStorage(!!window.localStorage);
  }, []);

  if (!userData && isThereLocalStorage) {
    if (localStorage.getItem('jwtToken')) {

      const checkSession = () => {
        const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
        if (Date.now() >= expirationTime) {
            handleLogout();
            alert('Session has ended. Please login to continue.');
            handleTabChange('Home');
        }
    };

    checkSession();
      setAuthToken(localStorage.getItem('jwtToken'));
      if (localStorage.getItem('jwtToken')) {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
        .then((response) => {
            let userData = jwtDecode(localStorage.getItem('jwtToken'));
            if (userData.email === localStorage.getItem('email')) {
                const combinedData = mergeObjects(response.data.userData, userData);
                setUserData(combinedData);
            } else {
                console.log('/users/login');
            }
        })
        .catch((error) => {
            console.log('error', error);
            handleTabChange('Home');
        });
      }
    }
  }

  const toggleFilter = () => {
    setIsFilterVisible((prevVisible) => !prevVisible);
    setFilterKey((prevKey) => prevKey + 1);
  };

  const handleUserData = (data) => {
    setUserData(data);
  };

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

  const searchProps = { resultsLength, toggleFilter, userData, searchQuery, resultsRoute: `/movies/search/${searchQuery}/`, setUserData, handleTabChange};
  const exploreProps = { toggleFilter, userData, setUserData, handleTabChange };
  const homepageProps = { handleTabChange, handleUserData, setUserData, userData };
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