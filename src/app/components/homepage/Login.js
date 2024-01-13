"use client";
import { useState } from 'react';
import axios from 'axios';

// utils
import setAuthToken from '../../utils/setAuthToken';

// styles
import style from './Login.module.css';

// component
export default function Login({ handleUserData }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmail = (e) => {
        const formatedEmail = e.target.value.toLowerCase(); // email addresses are case sensitive, so we need to make sure they are all lowercase
        setEmail(formatedEmail); // set email in state
    };

    const handlePassword = (e) => {
        setPassword(e.target.value); // no need to format password, but using the same function as email for consistency
    };

    const handleLoginSubmit = async (e) => { // handles login form submission
        e.preventDefault(); // prevent default form behavior
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { email, password }); // send login request to server
            if (response.status === 200) { // if login is successful, set token and userData in localStorage and state
                setError(false); // reset error state
                localStorage.setItem('jwtToken', response.data.token); // set token in localStorage
                localStorage.setItem('email', response.data.userData.email); // set email in localStorage
                localStorage.setItem('expiration', response.data.tokenExpiration); // set token expiration in localStorage
                setAuthToken(response.data.token); // set token in axios header so it is sent with every request
                handleUserData(response.data.userData); // set userData in state
            } else {
                console.log('Login failed, code:', response.status); // if login is unsuccessful, log the error code
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message); // if there is an error, set the error message
            setError(true); // set error state to true
        }
    };
    

    if (error) { // if there is an error, display error message and login form so user can try again
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
                            <input type="text" autocomplete="username" className={style.input} name="email" placeholder="Email" value={email} onChange={handleEmail} required />
                        </div>
                        <div>
                            <input type="password" autocomplete="password" className={style.input} name="password" placeholder="Password" value={password} onChange={handlePassword} required />
                        </div>
                        <div className={style.loginButtons}>
                            <button type="submit" className={style.button}>Login</button>
                            {/* <button type="button" className={style.button}>Forgot password?</button> */} {/* This will be functional in v2 after email confirmation at signup is implemented */}
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
                            {/* <button type="button" className={style.button}>Forgot password?</button> */} {/* This will be functional in v2 after email confirmation at signup is implemented */}
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