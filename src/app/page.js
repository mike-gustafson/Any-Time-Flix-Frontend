'use client'
import axios from 'axios';
import style from './page.module.css';
import handleLogout from './utils/handleLogout';
import React, { useState, useEffect } from 'react';

// component imports
import Signup from './components/signup/Signup';
import NavBar from './components/navbar/NavBar';
import Account from './components/Account';
import Explore from './components/Explore';
import Results from './components/Results';
import Homepage from './components/homepage/Homepage';

// Home component (is main component for all pages)
export default function Home() {
  const [activeView, setActiveView] = useState('Homepage');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [userData, setUserData] = useState(null);

// Ready for v1
  // userData clears on page refresh, so we need to check for a token and get the data if it exists
  useEffect(() => {
    if (typeof window !== 'undefined') { // checks if window is defined (vercel needs this to build)
      if (!userData && localStorage.getItem('userData')) { // checks if there no userData, but there is a token in localStorage (user is logged in but data missing due to page refresh)
        const userData = JSON.parse(localStorage.getItem('userData')); // get userData from localStorage
        setUserData(userData); // set userData in state
        
      }
    }
  }, [userData, activeView]);

  useEffect(() => {
    if (typeof window !== 'undefined') { // checks if window is defined (vercel needs this to build)
      if (!userData && !localStorage.getItem('jwtToken')) { // checks if there is no token in state, but there is a token in localStorage (user is logged in but token missing due to page refresh)
        setActiveView('Homepage'); // set active view to homepage
      }
    }
  }, [userData])

// are any of these three hooks necessary? Where are they used?
  const toggleFilter = () => {
    setIsFilterVisible((prevVisible) => !prevVisible); // toggle filter visibility
  };

  const handleUserData = () => {
    const userData = JSON.parse(localStorage.getItem('userData')); // get userData from localStorage
    setUserData(userData); // set userData in state
  };

  const removeUserData = () => {
    setUserData(null); // remove userData from state
  };

  const handleLogoutWhileInAccount = () => {
    if (activeView === 'Account') { // if user is on account page
      setActiveView('Homepage'); // set active view to homepage
    }
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
  const accountProps = { userData };
  const accountHooks = { handleUserData };

  const searchProps = { userData, resultsRoute: `/movies/search/${searchQuery}/`};
  const searchHooks = { toggleFilter, setUserData };

  const signupProps = {};
  const signupHooks = {};

// finalized hooks for v1
  const navBarHooks = { handleTargetPage, handleSearch, handleUserData, handleLogoutWhileInAccount };
  const navBarProps = { activeView };
  const homepageHooks = { handleTargetPage, handleSearch};

  const views = {
    Homepage: { component: Homepage, hooks: homepageHooks },
    Account: { component: Account, props: accountProps, hooks: accountHooks },
    Explore: { component: Explore, props: exploreProps, hooks: exploreHooks },
    Search: { component: Results, props: searchProps, hooks: searchHooks },
    Signup: { component: Signup, props: signupProps, hooks: signupHooks },
  };
  
// ready for v1
  const displayActiveView = () => {
    const { component: Component, props, hooks } = views[activeView] || views.Homepage; // if activeView is not found, default to Homepage
    return <Component {...props} {...hooks} />; // render component based on activeView with props and hooks
  };
  
  return (
    <div>
      <NavBar {...navBarHooks} {...navBarProps} />
      <main className={style.wrapper}>
        <div className={isFilterVisible ? style.dimmingOverlayVisible : style.dimmingOverlayHidden} />
        <div className={style.main}>
          {displayActiveView()} {/* render component determined by activeView */}
        </div>
      </main>
    </div>
  );
}