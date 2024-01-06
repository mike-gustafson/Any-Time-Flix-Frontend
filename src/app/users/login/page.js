"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import style from './page.module.css';


export default function Login({ handleTabChange }) {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmail = (e) => {
        // fill in code
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        // fill in code
        setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { email, password });
    
            if (response.status === 200) {
                console.log('success');
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('email', response.data.userData.email);
                localStorage.setItem('expiration', response.data.userData.exp);
                setAuthToken(response.data.token);
                let decoded = jwtDecode(response.data.token);
                setRedirect(true);
            } else {
                console.log('Login failed, code:', response.status);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setError(true);
        }
    };
    

    if (redirect) { 
        console.log('sending to profile page')
        handleTabChange('Account')}
    if (error) {
        return (
            <div className={style.container}>
                <div className={style.singleCard} >
                            <h4 className={style.loginError}>{errorMessage} - Please try again</h4>
                            <div className={style.cardBody}>
                    <form className={style.loginForm} onSubmit={handleSubmit}>
                        <h2 className={style.title}>Login</h2>
                        <p>Sign In to your account</p>
                        <div className="input-group mb-3">
                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                            <input type="text" className="form-control" placeholder="Email" value={email} onChange={handleEmail} required />
                        </div>
                        <div className="input-group mb-4">
                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                            <input type="password" className="form-control" placeholder="Password" alue={password} onChange={handlePassword} required />
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
            <div className={style.cards}>
            <div className={style.card}>
                <div className={style.cardBody}>
                    <form className={style.loginForm} onSubmit={handleSubmit}>
                        <h2 className={style.title}>Login</h2>
                        <p>Sign In to your account</p>
                        <div className="input-group mb-3">
                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                            <input type="text" className="form-control" placeholder="Email" value={email} onChange={handleEmail} required />
                        </div>
                        <div className="input-group mb-4">
                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                            <input type="password" className="form-control" placeholder="Password" alue={password} onChange={handlePassword} required />
                        </div>
                        <div className={style.loginButtons}>
                            <button type="submit" className={style.button}>Login</button>
                            <button type="button" className={style.button}>Forgot password?</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={style.card}>
                <div className={style.cardBody} >
                    <div className={style.signup}>
                        <h2 className={style.title}>Sign up</h2>
                        <p>Get started now by creating an account.</p>
                        <a href="/users/signup" type="button" className={style.button}>Register Now!</a>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}