// Imports
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NewUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [bio, setBio] = useState('');
    const [userName, setUserName] = useState('');


    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleCity = (e) => {
        setCity(e.target.value);
    };

    const handleState = (e) => {
        setState(e.target.value);
    };

    const handleCountry = (e) => {
        setCountry(e.target.value);
    };

    const handleUserName = (e) => {
        setUserName(e.target.value);
    };

    const handleBio = (e) => {
        setBio(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function

        const newUser = { firstName, lastName, email, userName, password, city, state, country, bio };
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/new`, newUser)
            .then(response => {
                console.log(response);
                setRedirect(true);
            })
            .catch(error => console.log('===> Error in Signup', error));

    };

    if (redirect) { router.push('/users'); }
    // You can have them redirected to profile (your choice)

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Make New User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">First Name</label>
                            <input type="text" name="firstName" value={firstName} onChange={handleFirstName} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" value={lastName} onChange={handleLastName} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userName">Username</label>
                            <input type="text" name="userName" value={userName} onChange={handleUserName} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bio"></label>
                            <input type="text" name="bio" value={bio} onChange={handleBio} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewUser;