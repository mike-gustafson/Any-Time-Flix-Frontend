'use client'
import style from './page.module.css';
import React, { useState, useEffect } from 'react';
import { UserProvider } from './utils/UserContext';

// Components
import Nav from './components/Nav';
import Account from './components/Account';
import Explore from './components/Explore';
import Results from './components/Results';
import Homepage from './components/Homepage';

export default function Home() {

  const [activeView, setActiveView] = useState('Home'); // Sets active view to Home by default, used to change content beneath nav
  const [searchQuery, setSearchQuery] = useState(''); // Search query to pass to search route in TMDB API
  const [resultsKey, setResultsKey] = useState(1); // Updates results key to facilitate re-rendering of Results component
  const [resultsLength, setResultsLength] = useState(10); // Max number of results to deisplay in Results component, defaults to 10
  const [filterKey, setFilterKey] = useState(0); // Updates filter key to facilitate re-rendering of Filter component
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Controls visibility of Filter component
  const [userData, setUserData] = useState(null); // User data from server, used to create user context

  // toggle filter visibility (used to dim background when modal is open)
  const toggleFilter = () => {
    setIsFilterVisible(prevVisible => !prevVisible); // toggle visibility
    setFilterKey(prevKey => prevKey + 1); // update key to re-render Filter component
  };

  const handleUserData = (data) => {
    setUserData(data);
    console.log('user data', data)
  }

  const handleMain = (setActiveView, setResultsKey, resultsKey, selectedView) => {
    setActiveView(selectedView);
    setResultsKey(resultsKey + 1);
};

  // re-render when filter visibility changes
  useEffect(() => {}, [isFilterVisible]);  

  // Processes tab change, updates active view, and clears search query
  const handleTabChange = (selectedTab) => {
    setActiveView(selectedTab); // update active view based on selected tab in Nav
    setResultsKey(resultsKey + 1); // update results key to re-render Results component
    clearSearchQuery(); // clear search query if there is one
  };

  // Processes search query, updates search query, and updates results key
  const handleSearch = (query) => {
    setSearchQuery(query);  // update search query to inputed query in Nav/Search
    setResultsKey(resultsKey + 1); // update results key to re-render Results component
  };

  // Resets search query to empty string
  const clearSearchQuery = () => {setSearchQuery('')};

  // Determines which content to render based on active view and/or search query from Nav
  const renderContent = () => {
    if (searchQuery) { // if there is a search query, render Results component with search reults
      return (
        <Results
          key={resultsKey}
          resultsLength={resultsLength}
          resultsRoute={`/movies/search/${searchQuery}`}
          toggleFilter={toggleFilter}
          userData={userData}
        />
      );
    } else {
      if (activeView === 'Home') { // if Home is clicked in Nave, render Homepage component
        return (
          <Homepage  
            handleTabChange={handleTabChange} // pass handleTabChange function to Homepage component
            handleUserData={handleUserData} // pass handleUserData function to Homepage component
            setUserData={setUserData}
          />
          
        );
      } else if (activeView === 'Account') { // if Account is clicked in Nav, render UserHome component
        return (
          <Account
            handleUserData={handleUserData} // pass handleUserData function to Account component
            setUserData={setUserData}
            handleTabChange={handleTabChange} // pass handleTabChange function to Account component
          />
        );
      } else if (activeView === 'Explore') { // if Explore is clicked in Nav, render Explore component
        return (
          <Explore 
            toggleFilter={toggleFilter}  // pass toggleFilter function to Explore component
            userData={userData} // pass handleUserData function to Explore component
            setUserData={setUserData}
          />
          // Modal is triggered in Explore component so toggleFilter must be used there to dim background
        );
      }
    }
  };

  // Code rendered to browser.
  return (
    <UserProvider> {/* wrap app in UserProvider to provide access to user data */}
      <main className={style.wrapper}> 
        
        {/* dimming overlay to dim background when modal is open */}
        <div key={filterKey} className={isFilterVisible ? style.dimmingOverlayVisible : style.dimmingOverlayHidden} /> 
        
        {/* Nav component diplays navbar across top of app */}
        <Nav handleTabChange={handleTabChange} handleSearch={handleSearch} />

        {/* main content of app. This is the area where all content should be rendered */}
        <div className={style.main}>
          {renderContent()} {/* render content based on active view and/or search query by running renderContent function */}
        </div>
      </main>
    </UserProvider>
  );
}