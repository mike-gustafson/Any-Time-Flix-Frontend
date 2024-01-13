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
import Homepage from './components/homepage/Homepage';

// Home component (is main component for all pages)
export default function Home() {
  const [activeView, setActiveView] = useState('Homepage');
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsKey, setResultsKey] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [userData, setUserData] = useState(null);

// Ready for v1
  // userData clears on page refresh, so we need to check for a token and get the data if it exists
  useEffect(() => {
    if (typeof window !== 'undefined') { // checks if window is defined (vercel needs this to build)
      if (!userData && localStorage.getItem('jwtToken')) { // checks if there no userData, but there is a token in localStorage (user is logged in but data missing due to page refresh)
        setAuthToken(localStorage.getItem('jwtToken')); // set token in axios header
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/refreshData`) // get user data from server
          .then((response) => {
            setUserData(response.data.data); // set userData in state
          })
          .catch((error) => {
            console.log('error', error);
            handleLogout(); // if there is an error, log the user out (removes token from localStorage)
            handleTargetPage('Home'); // send user to homepage
          });
      }
    }
  }, [userData, activeView]);

// are any of these three hooks necessary? Where are they used?
  const toggleFilter = () => {
    setIsFilterVisible((prevVisible) => !prevVisible); // toggle filter visibility
  };

  const handleUserData = (userData) => {
    setUserData(userData); // set userData in state
  };

  const removeUserData = () => {
    setUserData(null); // remove userData from state
  };


// Ready for v1
  // handles the target page when a user clicks on a navbar icon
  const handleTargetPage = (clickedIcon) => {
    if (clickedIcon === 'Logout') { // if user clicks logout, log them out and remove userData from state
      handleLogout(); // removes token from localStorage
      removeUserData(); // removes userData from state
    } else {
      setActiveView(clickedIcon); // set active view to clicked icon
    }
  };

// Ready for v1
  // handles the query from the search bar in the navbar
  const handleSearch = (query) => {
    setSearchQuery(query); // set search query, used to pass query to search results route
    setActiveView('Search'); // set active view to search results
    if (typeof window !== 'undefined') { // checks if window is defined (vercel needs this to build)
      if (localStorage.getItem('jwtToken')) { // checks if there is a token in localStorage (user is logged in)
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/updateRecentSearches/`, { query }) // update recent searches
          .then((response) => {
            setUserData(response.data.updatedUserData); // update userData in state with new recent searches
          })
      }
    }
  };

  const exploreProps = { userData };
  const exploreHooks = { toggleFilter, removeUserData, handleTargetPage, setUserData };
  const homepageHooks = { handleTargetPage, handleUserData};
  const accountProps = { userData };
  const accountHooks = { handleUserData };

  const searchProps = { userData, resultsRoute: `/movies/search/${searchQuery}/`};
  const searchHooks = { toggleFilter, setUserData };

  // finalized hooks for v1
  const navBarHooks = { handleTargetPage, handleSearch};

  const views = {
    Homepage: { component: Homepage, hooks: homepageHooks },
    Account: { component: Account, props: accountProps, hooks: accountHooks },
    Explore: { component: Explore, props: exploreProps, hooks: exploreHooks },
    Search: { component: Results, props: searchProps, hooks: searchHooks },
  };
  
  const displayActiveView = () => {
    const { component: Component, props, hooks } = views[activeView] || views.Homepage;
    return <Component {...props} {...hooks} key={resultsKey} />;
  };
  
  return (
    <div>
      <NavBar {...navBarHooks} />
      <main className={style.wrapper}>
        <div className={isFilterVisible ? style.dimmingOverlayVisible : style.dimmingOverlayHidden} />
        <div className={style.main}>
          {displayActiveView()}
        </div>
      </main>
    </div>
  );
}