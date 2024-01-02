import React, { useState } from 'react';

import style from '../../styles/Explore.module.css';

import LiveTvIcon from '@mui/icons-material/LiveTv';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';

export default function Sidebar({ handleMain }) {
    const [activeLink, setActiveLink] = useState("Popular");

    const handleLinkClick = (newValue) => {
        setActiveLink(newValue);
        handleMain(newValue);
    };
    return (
        <div className={style.sidebarBody}>
            <div className={style.header}>
                <h3>Top lists</h3>
                <div 
                    className={`${style.link} ${activeLink === 'Popular' ? style.activeLink : ''}`} 
                    onClick={() => handleLinkClick("Popular")}>
                    <AutoAwesomeIcon className={style.icon} />Popular
                </div>
                <div 
                    className={`${style.link} ${activeLink === 'Top Rated' ? style.activeLink : ''}`} 
                    onClick={() => handleLinkClick("Top Rated")}>
                    <TrendingUpIcon className={style.icon} />Top Rated
                </div>
                <div 
                    className={`${style.link} ${activeLink === 'Now Playing' ? style.activeLink : ''}`} 
                    onClick={() => handleLinkClick("Now Playing")}>
                    <LiveTvIcon className={style.icon} />Now Playing
                </div>
                <div 
                    className={`${style.link} ${activeLink === 'Upcoming' ? style.activeLink : ''}`}  
                    onClick={() => handleLinkClick("Upcoming")}>
                        <CalendarMonthIcon className={style.icon} />Upcoming
                </div>
                <hr />
                <h3>Find movies by</h3>
                <div className={style.link} onClick={() => handleLinkClick("Genre")}><MovieCreationIcon className={style.icon} />Genre</div>
                <div className={style.link} onClick={() => handleLinkClick("Year")}><CalendarMonthIcon className={style.icon} />Year</div>
                <div className={style.link} onClick={() => handleLinkClick("Rating")}><StarIcon className={style.icon} />Rating</div>
            </div>
        </div>
    );
}
