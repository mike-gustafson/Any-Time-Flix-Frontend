'use client'
import axios from 'axios';
import style from './page.module.css';
import handleLogout from './utils/handleLogout';
import setAuthToken from './utils/setAuthToken';
import React, { useState, useEffect } from 'react';

// component imports
import NavBar from './components/navbar/NavBar';
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

  useEffect(() => { 
    setIsThereLocalStorage(!!window.localStorage)
  }, []);

  // userData clears on page refresh, so we need to check for a token and get the data if it exists
  useEffect(() => {
    if (!userData && isThereLocalStorage) {
      if (localStorage.getItem('jwtToken')) {
        console.log('token but no data so we are fixing that')
        setAuthToken(localStorage.getItem('jwtToken'));
        const userData = axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/refreshData`)
          .then((response) => {
            handleUserData(response.data.data);
          })
          .catch((error) => {
            console.log('error2', error);
            handleLogout();
            handleTargetPage('Home');
          });
      } else {
        handleTargetPage('Home');
      }
    } else if (userData && localStorage.getItem('jwtToken')) {
      console.log('token and data are both ready to go')
    }
  }, [userData, activeView]);

  const toggleFilter = () => {
    setIsFilterVisible((prevVisible) => !prevVisible);
    setFilterKey((prevKey) => prevKey + 1);
  };

  // store userData in localStorage
  const handleUserData = (userData) => {
    setUserData(userData);
  };

  const removeUserData = () => {
    setUserData(null);
  };

  const handleTargetPage = (selectedTab) => {
    if (selectedTab === 'Logout') {
      handleLogout();
      handleTargetPage('Home');
    } else {
      setActiveView(selectedTab);
      setResultsKey((prevKey) => prevKey + 1);
    }
  };

  // handles the query from the search bar in the navbar
  const handleSearch = (query) => {
    // set the search query useState to the query
    setSearchQuery(query);
    // set active view to search results
    setActiveView('Search');
    // run route to add search to recent searches if the user is logged in 
    if (localStorage.getItem('jwtToken')) {
      const updatedUserData = axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/updateRecentSearches/`, { query })
        .then((response) => {
          setUserData(response.data.updatedUserData);
          console.log('response.data', response.data.updatedUserData)
        })
    }
  };

  const searchProps = { resultsLength, toggleFilter, userData, searchQuery, resultsRoute: `/movies/search/${searchQuery}/`, setUserData, handleTargetPage};
  const exploreProps = { toggleFilter, userData, removeUserData, handleTargetPage, setUserData };
  const homepageProps = { handleTargetPage, handleUserData, setUserData, userData };
  const accountProps = { handleUserData, userData };
  const navBarHooks = { handleTargetPage, handleSearch};

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
    <div>
      <NavBar {...navBarHooks} />
      <main className={style.wrapper}>
        <div key={filterKey} className={isFilterVisible ? style.dimmingOverlayVisible : style.dimmingOverlayHidden} />
        <div className={style.main}>
          {displayActiveView()}
        </div>
      </main>
    </div>
  );
}