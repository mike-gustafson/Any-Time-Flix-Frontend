import React, { useState } from 'react';

import style from '../../styles/Explore.module.css';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ReplayIcon from '@mui/icons-material/Replay';


export default function ProfileSidebar({ handleMain , dataProp }) {
    const [activeLink, setActiveLink] = useState("Watch List");

    console.log(dataProp, 'props')
    
    const handleLinkClick = (newValue) => {
        setActiveLink(newValue);
        handleMain(newValue);
    };
    return (
        <div className={style.sidebarBody}>
            <div className={style.header}>
                <h3>Your Theater</h3>
                <div
                    className={`${style.link} ${activeLink === 'Watch List' ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick("Watch List")}>
                    <WatchLaterIcon className={style.icon} />Watch List
                </div>
                <div
                    className={`${style.link} ${activeLink === 'Watched' ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick("Watched")}>
                    <AlarmOnIcon className={style.icon} />Watched
                </div>
                <div
                    className={`${style.link} ${activeLink === 'Liked' ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick("Liked")}>
                    <EmojiEmotionsIcon className={style.icon} />Liked
                </div>
                <div
                    className={`${style.link} ${activeLink === 'Playlist' ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick("Playlist")}>
                    <ReplayIcon className={style.icon} />Playlist
                </div>
            </div>
        </div>
    )
}