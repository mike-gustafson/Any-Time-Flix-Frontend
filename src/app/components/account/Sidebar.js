import React, { useState } from 'react';


import Box from '@mui/material/Box';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import style from './Sidebar.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ReplayIcon from '@mui/icons-material/Replay';
import { Avatar } from '@mui/material';
import Divider from '@mui/material/Divider'

export default function Sidebar({ handleMain, userData }) {
    const [activeLink, setActiveLink] = useState(" ");

    const links = ['Watch List', 'Watched', 'Liked', 'Disliked', 'Playlist', 'Recent Searches', 'Profile']

    const handleLinkClick = (newValue) => {
        setActiveLink(newValue);
        handleMain(newValue);
    };

    const renderLinks = () => {
        return links.map((link, index) => {
            return (
                <div
                    key={index}
                    className={`${style.link} ${activeLink === link ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick(link)}>
                    <LocalMoviesIcon className={style.icon} />{link}
                </div>
            )
        })
    }

    return (
        <div className={style.sidebarBody}>
            <div className={style.header}>

                <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', paddingTop: 4, paddingLeft: 4 }}>
                    
                        <ListItem disablePadding>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ListItemIcon>
                                    <Avatar>{userData.firstName[0]}</Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={`${userData.firstName} ${userData.lastName}`}
                                    primaryTypographyProps={{ variant: 'h5' }}
                                />
                            </div>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <PersonPinCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${userData.city} ${userData.state}`}
                                primaryTypographyProps={{ variant: 'caption' }}
                            />
                        </ListItem>

                        <ListItem button disablePadding onClick={() => handleLinkClick('Follow')}>
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Follow"
                                primaryTypographyProps={{ variant: 'button' }}
                            />
                        </ListItem>

                        <ListItem button disablePadding onClick={() => handleLinkClick('Message')}>
                            <ListItemIcon>
                                <MessageIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Message"
                                primaryTypographyProps={{ variant: 'button' }}
                            />
                        </ListItem>

                
                </Box>
                <Divider/>
                <div
                    className={`${style.link} ${activeLink === 'Profile' ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick("Profile")}>
                    <AccountCircleIcon className={style.icon} />Profile
                </div>
            <div className={style.linkContainer}>
                <h3 className={style.header}>Your Lists</h3>
                <div className={style.linkList}>
                    {renderLinks()}
                </div>
            </div>
        </div >
        </div>
    )
}