import React from 'react';

// Styles
import style from '../styles/Tabs.module.css';

// Material-ui components
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// Material-ui Icons
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// This component is used to render the tabs in the Nav.js component
export default function Tabs({ handleTabChange }) {
    const handleTabClick = (event, newValue) => {
        handleTabChange(newValue); // Call the handleTabChange function passed as a prop
    };

    return (
        <BottomNavigation showLabels onChange={handleTabClick} className={style.container}>
            <BottomNavigationAction label="Home" icon={<HomeIcon />} value="Home" className={style.icon} />
            <BottomNavigationAction label="Explore" icon={<TravelExploreIcon />} value="Explore" className={style.icon} />
            <BottomNavigationAction label="Recommended" icon={<SavedSearchIcon />} value="Recommended" className={style.icon} />
           <BottomNavigationAction label="Account" icon={<AccountBoxIcon />} value="Account" className={style.icon} />
        </BottomNavigation>
    );
}