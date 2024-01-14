import axios from 'axios';
import React, { useState } from 'react';
import styles from './Login.module.css';

import handleLogin from '../../utils/handleLogin';
import setAuthToken from '../../utils/setAuthToken';

export default function Login({ handleUserData }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmail = (e) => {
        const formattedEmail = e.target.value.toLowerCase();
        setEmail(formattedEmail);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <h2 className={styles.title}>Login</h2>
                    <p>Sign In to your account</p>
                    <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className={styles.input}
                                name="email"
                                autoComplete="username"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmail}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={styles.input}
                                name="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePassword}
                                required
                            />
                        </div>
                        <div className={styles.loginButtons}>
                            <button type="submit" className={styles.button}>
                                Login
                            </button>
                        </div>
                        {error && (
                            <p className={styles.loginError}>
                                {errorMessage} - Please try again
                            </p>
                        )}
                        <h5>Remember, email addresses are case sensitive</h5>
                    </form>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <h2 className={styles.title}>Sign up</h2>
                    <p>
                        Dont have an account yet? Join us for free today by clicking the
                        signup button below.
                    </p>
                    <a href="/users/signup" type="button" className={styles.button}>
                        Register Now!
                    </a>
                </div>
            </div>
        </div>
    );
}
