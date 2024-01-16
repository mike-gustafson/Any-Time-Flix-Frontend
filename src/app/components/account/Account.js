import { useState } from 'react';

import Profile from './Profile';
import UserList from './UserList';
import Sidebar from './Sidebar';
import style from './Account.module.css';

export default function Page({ userData, handleUserData }) {
    const [isLoading, setLoading] = useState(false);
    const [activeView, setActiveView] = useState('Profile');

    if (!userData) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        handleUserData(userData);
    }

    const handleUpdateList = (listName, removedMovieId) => {
        setData(prevData => ({
            ...prevData,
            userData: {
                ...prevData.userData,
                [listName]: prevData[listName].filter(movie => movie.id !== removedMovieId)
            }
        }));
    };

    const renderContent = () => {
        const listMapping = {
            'Watch List': 'watchList',
            'Watched': 'watched',
            'Liked': 'liked',
            'Disliked': 'disliked',
        };
        const currentListName = listMapping[activeView];
        // if activeView is in listMapping, render UserList
        if (currentListName) {
            return (
                <UserList list={userData[currentListName]} dataProp={userData} listName={currentListName} onUpdateList={(movieId) => handleUpdateList(currentListName, movieId)} />
            );
        } else if (activeView === 'Profile') {
            return (
                <Profile userData={userData} />
            );
        } else if (activeView === 'Recent Searches') {
            return (
                <UserList list={userData.recentSearches} userData={userData} listName="recentSearches" onUpdateList={(movieId) => handleUpdateList('recentSearches', movieId)} />
            );
        }
    };

    return (
        <div className={style.container}>
            <div className={style.sidebar}>
                <Sidebar handleMain={setActiveView} userData={userData} />
            </div>
            <div className={style.main}>
                {renderContent()}
            </div>
        </div>
    );
}
