'use client'
import { useState, useEffect } from 'react';
import style from '../../styles/Explore.module.css'
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';
import setAuthToken from '@/app/utils/setAuthToken';
import ProfileSidebar from './profileSidebar'
import Profile from './profile';


export default function Page({handleMain}) {
    // state is what the data is representing in realtime
    const router = useRouter();
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);

    const expirationTime = new Date(parseInt(localStorage.getItem('expiration')) * 1000);
    let currentTime = Date.now();

    // make a condition that compares exp and current time
    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login to continue.');
        router.push('/users/login');
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        if (localStorage.getItem('jwtToken')) {
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/email/${localStorage.getItem('email')}`)
                .then((response) => {
                    // data is an object
                    let userData = jwtDecode(localStorage.getItem('jwtToken'));
                    if (userData.email === localStorage.getItem('email')) {
                        console.log('response from page.js', response.data);
                        const { data } = response;
                        console.log('Data', data)
                        setData(data);
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
    return (
                        <div className={style.container}>
                            <div className={style.sidebar}>
                                <ProfileSidebar handleMain={handleMain} dataProp={data.userData}/>
                            </div>
                            <div className={style.main}>
                                {/* {renderContent()} */}
                                <Profile dataProp={data.userData}/>
                            </div>
                        </div>
                
    )
}