import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Signup() {
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
            console.log(response)
            alert('Signup successful');
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
        <div>
            <h2>Signup</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    User Name:
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Country:
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    >
                        <option value="">Select a Country</option>
                        {countries.map((countryData) => (
                            <option
                                key={countryData.iso_3166_1}
                                value={countryData.iso_3166_1}
                            >
                                {countryData.english_name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Profile Picture URL:
                    <input
                        type="text"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
