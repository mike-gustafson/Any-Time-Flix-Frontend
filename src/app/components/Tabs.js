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
import styled from '@emotion/styled';

// This component is used to render the tabs in the Nav.js component
export default function Tabs({ handleTabChange }) {
    const handleTabClick = (event, newValue) => {
        handleTabChange(newValue); // Call the handleTabChange function passed as a prop
    };

    return (
        <BottomNavigation showLabels onChange={handleTabClick} className={style.container}>
            <BottomNavigationAction label="Now Playing" icon={<LiveTvIcon />} value="Now Playing" className={style.icon} />
            <BottomNavigationAction label="Popular" icon={<AutoAwesomeIcon />} value="Popular" className={style.icon} />
            <BottomNavigationAction label="Recommended" icon={<SavedSearchIcon />} value="Recommended" className={style.icon} />
        </BottomNavigation>
    );
}

