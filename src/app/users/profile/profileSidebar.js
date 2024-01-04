import React, { useState } from 'react';

import style from '../../styles/Explore.module.css';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ReplayIcon from '@mui/icons-material/Replay';
import { Avatar } from '@mui/material';


export default function ProfileSidebar({ handleMain , dataProp }) {
    const [activeLink, setActiveLink] = useState("Watch List");
    

    const data = dataProp;
    
    const handleLinkClick = (newValue) => {
        setActiveLink(newValue);
        handleMain(newValue);
    };
    return (
        <div className={style.sidebarBody}>
            <div className={style.header}>
                <Avatar>{data.firstName[0]}</Avatar>
                <div className="mt-3">
                    <h4>{data.firstName} {data.lastName}</h4>
                    <p className="text-muted font-size-sm">{data.city},{data.state}</p>
                    <button>Follow</button>
                    <button>Message</button>
                </div>
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