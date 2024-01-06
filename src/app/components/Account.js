'use client'
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// import different use hooks from react and next
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';

// import different functions from utils
import handleLogout from '@/app/utils/handleLogout';
import setAuthToken from '@/app/utils/setAuthToken';

// import different components
import Profile from './account/Profile';
import UserList from './account/UserList';
import ProfileSidebar from './account/ProfileSidebar'

// import style from '../styles/Explore.module.css'
import style from '../styles/Explore.module.css'

export default function Page({handleUserData, handleMain}) {
    
    // useRouter hook allows us to access the router object
    const router = useRouter();

    // useState hook allows us to use state in a functional component
    const [data, setData] = useState(null); // data is the user data returned from the server
    const [isLoading, setLoading] = useState(true); // isLoading is used to determine if data has been returned from the server
    const [resultsKey, setResultsKey] = useState(1); // resultsKey is used to re-render the Results component
    const [activeView, setActiveView] = useState('Profile'); // activeView is used to determine which content to render in the main section of the page

    const customHandleMain = (selectedView) => {
        handleMain(setActiveView, setResultsKey, resultsKey, selectedView);
    };

    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    let currentTime = Date.now();

    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/');
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((response) => {
                    // data is an object
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        setData(response.data);
                        handleUserData(response.data);
                        setLoading(false);
                    } else {
                        router.push('/users/login');
                    }

                })
                .catch((error) => {
                    console.log('error', error);
                    router.push('/users/login');
                });
        } else {
            router.push('/users/login');
        }
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No data shown...</p>;
    const renderContent = () => {
        if (activeView === 'Profile') {
            return (
             <Profile dataProp={data.userData} />
            );
        } else if (activeView === 'Watch List') {
            return (
                <UserList list={data.userData.watchList} />
            );
        } else if (activeView === 'Watched') {
            return (
               <UserList list={data.userData.watched} />
            );
        } else if (activeView === 'Liked') {
            return (
               <UserList list={data.userData.liked} />
            );
        }else if (activeView === 'Playlist') {
            return (
               <div>Playlist</div>
            );
        }
    };
    return (
        <div className={style.container}>
            <div className={style.sidebar}>
                <ProfileSidebar handleMain={customHandleMain} dataProp={data.userData} />
            </div>
            <div className={style.main}>
                {renderContent()}
                
            </div>
        </div>

    )
}