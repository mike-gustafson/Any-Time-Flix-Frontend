import React, { useState } from 'react';


import Box from '@mui/material/Box';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import style from '../../styles/Explore.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ReplayIcon from '@mui/icons-material/Replay';
import { Avatar } from '@mui/material';
import Divider from '@mui/material/Divider'


export default function ProfileSidebar({ handleMain, dataProp }) {
    const [activeLink, setActiveLink] = useState(" ");


    const data = dataProp;

    const handleLinkClick = (newValue) => {
        setActiveLink(newValue);
        handleMain(newValue);
    };
    return (
        <div className={style.sidebarBody}>
            <div className={style.header}>

                <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper', paddingTop: 4, paddingLeft: 4 }}>
                    
                        <ListItem disablePadding>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ListItemIcon>
                                    <Avatar>{data.firstName[0]}</Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={`${data.firstName} ${data.lastName}`}
                                    primaryTypographyProps={{ variant: 'h5' }}
                                />
                            </div>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <PersonPinCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${data.city} ${data.state}`}
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

                <h3>Your Theater<LocalMoviesIcon/></h3>
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
        </div >
    )
}