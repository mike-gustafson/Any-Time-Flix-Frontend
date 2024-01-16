import axios from 'axios';
import React, { useState, useEffect } from 'react';

import style from './Signup.module.css';
import handleLogin from '../../utils/handleLogin';

export default function Signup({ setActiveView, handleUserData }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        city: '',
        state: '',
        country: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
        profilePicture: '',
    });

    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getCountries();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        formData.email = formData.email.toLowerCase();
        const requiredFields = [formData.firstName, formData.lastName, formData.userName, formData.country, formData.email, formData.password, formData.confirmPassword];
        const emptyFields = requiredFields.filter((field) => field === '');
        if (emptyFields.length > 0) {
            alert('All fields are required');
            return;
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signup`, formData);
            if (response.status === 200) {
                await handleLogin(formData.email, formData.password);
                handleUserData();
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const getCountries = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/utilities/countries`);
            console.log(response)
            const countriesData = response.data.response;
            const sortedCountries = countriesData.sort((a, b) => {
                if (a.english_name < b.english_name) {
                    return -1;
                }
                if (a.english_name > b.english_name) {
                    return 1;
                }
                return 0;
            });
            setCountries(sortedCountries);
        } catch (err) {
            setError('An error occurred while fetching countries');
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2>Join Any Time Flix</h2>
                <p className={style.signupPitch}>Users enjoy the ability to search for movies, add them to their watchlist, see where they&apos;re streaming, and more! Sign up today to start enjoying these features!</p>
            </div>
            <div className={style.formContainer}>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit} className={style.form}>
                    <label className={style.formItem}>
                        <input className={style.field} placeholder="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </label>
                    <label className={style.formItem}>
                        <input className={style.field} placeholder="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </label>
                    <label className={style.formItem}>
                        <input className={style.field} placeholder="User Name" type="text" name="userName" value={formData.userName} onChange={handleChange} />
                    </label>
                    <label className={style.formItem}>
                        <input className={style.field} placeholder="City" type="text" name="city" value={formData.city} onChange={handleChange} />
                    </label>
                    <label className={style.formItem}>
                        <input className={style.field} placeholder="State" type="text" name="state" value={formData.state} onChange={handleChange} />
                    </label>
                    <label className={style.formItem}>
                        <select className={style.countryDropdown} name="country" value={formData.country} onChange={handleChange}
                        >
                            <option value="">Select a Country</option>
                            {countries.map((countryData) => (
                                <option key={countryData.iso_3166_1} value={countryData.iso_3166_1}>
                                    {countryData.english_name.slice(0, 30)}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={style.formItem}>
                        <input className={style.field} placeholder="E-Mail" type="email" name="email" value={formData.email} onChange={handleChange} />
                        </label>
                        <label className={style.formItem}>
                            <input className={style.field} placeholder="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>
                    <label className={style.formItem}>
                        <input className={style.field} placeholder="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    </label>
                    <label className={style.formItem}>
                        <textarea className={style.bioField} placeholder="Tell us about yourself..." name="bio" value={formData.bio} onChange={handleChange} rows="10" />
                    </label>
                    <label className={style.formItem}>
                        <input className={style.field} placeholder="Enter URL for Profile Picture" type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
                    </label>
                    <button className={style.submit} type="submit">Sign Up</button>
                </form>
            </div>
        </div>

    );
}
