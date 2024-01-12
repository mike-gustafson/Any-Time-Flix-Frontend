"use client";
import { useState } from 'react';
import axios from 'axios';

// util imports
import setAuthToken from '../utils/setAuthToken';

// style imports
import style from '../styles/Login.module.css';


export default function Login({ handleTabChange, handleUserData }) {

    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { email, password });
            if (response.status === 200) {
                setError(false);
                console.log(response.data)
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('email', response.data.userData.email);
                localStorage.setItem('expiration', response.data.tokenExpiration);
                setAuthToken(response.data.token);
                setRedirect(true);
                handleUserData(response.data.userData);
            } else {
                console.log('Login failed, code:', response.status);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setError(true);
        }
    };
    
    if (redirect) { handleTabChange('Account') }

    if (error) {
        return (
            <div className={style.container}>
                <div className={style.singleCard} >
                    <h4 className={style.loginError}>{errorMessage} - Please try again</h4>
                    <h5>Remember, email addresses are case sensitive</h5>
                    <div className={style.cardBody}>
                    <form className={style.loginForm} onSubmit={handleLoginSubmit}>
                        <h2 className={style.title}>Login</h2>
                        <p>Sign In to your account</p>
                        <div>
                            <input type="text" className={style.input} name="email" placeholder="Email" value={email} onChange={handleEmail} required />
                        </div>
                        <div>
                            <input type="password" className={style.input} name="password" placeholder="Password" alue={password} required />
                        </div>
                        <div className={style.loginButtons}>
                            <button type="submit" className={style.button}>Login</button>
                            <button type="button" className={style.button}>Forgot password?</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }

    return (
        <div className={style.container}>
            <div className={style.card}>
                <div className={style.cardBody}>
                    <h2 className={style.title}>Login</h2>
                    <p>Sign In to your account</p>
                    <form className={style.loginForm} onSubmit={handleLoginSubmit}>
                        <div>
                            <input type="text" className={style.input} name="email" autoComplete="off" placeholder="Email" value={email} onChange={handleEmail} required />
                        </div>
                        <div>
                            <input type="password" className={style.input} name="password" autoComplete="off" placeholder="Password" value={password} onChange={handlePassword} required />
                        </div>
                        <div className={style.loginButtons}>
                            <button type="submit" className={style.button}>Login</button>
                            {/* <button type="button" className={style.button}>Forgot password?</button> */}
                        </div>
                    </form>
                </div>
            </div>
            <div className={style.card}>
                <div className={style.cardBody} >
                        <h2 className={style.title}>Sign up</h2>
                        <p>Dont have an account yet? Join us for free today by clicking thesignup button below.</p>
                        <a href="/users/signup" type="button" className={style.button}>Register Now!</a>
                    </div>
            </div>
        </div>
    );
}