"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import style from '../../styles/Explore.module.css'
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import handleLogout from '@/app/utils/handleLogout';
import axios from 'axios';
import setAuthToken from '@/app/utils/setAuthToken';
import ProfileSidebar from './profileSidebar'


export default function Profile({handleMain}) {
    // state is what the data is representing in realtime
    const router = useRouter();
    const [data, setData] = useState(null);
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
                        console.log('response', response.data);
                        setData(response.data.userData);
                        console.log(data)
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
        <div className="container">
            <div className="main-body">

                <nav aria-label="breadcrumb" className="main-breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href="/users/profile">Profile</a></li>
                        <li className="breadcrumb-item" onClick={handleLogout}><a href="">Logout</a></li>
                    </ol>
                </nav>

                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    {/* <Image 
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt="Admin"
                                    className="rounded-circle"
                                    width="150"
                                    height={"150"}
                                    /> */}
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                    <div className="mt-3">
                                        <h4>{data.firstName} {data.lastName}</h4>
                                        <p className="text-muted font-size-sm">{data.city}, {data.state}</p>
                                        <button className="btn btn-primary">Follow</button>
                                        <button className="btn btn-outline-primary">Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.container}>
                            <div className={style.sidebar}>
                                <ProfileSidebar handleMain={handleMain} />
                            </div>
                            <div className={style.main}>
                                {/* {renderContent()} */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {data.firstName} {data.lastName}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {data.email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {data.number}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Mobile</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {data.number}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                        <a className="btn btn-info " target="__blank" href="/users/edit">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row gutters-sm">
                            <div className="col-sm-6 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                                        <small>Web Design</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <small>Website Markup</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '72%' }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <small>One Page</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '89%' }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <small>Mobile Template</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <small>Backend API</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '66%' }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                                        <small>Web Design</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '80%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <small>Website Markup</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '72%' }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <small>One Page</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '89%' }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <small>Mobile Template</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '55%' }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <small>Backend API</small>
                                        <div className="progress mb-3" style={{ height: '5px' }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '66%' }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
        </div>
    );
}