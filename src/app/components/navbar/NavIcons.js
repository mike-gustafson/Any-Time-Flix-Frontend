'use client'
import React, { useEffect, useState, useRef, use } from 'react';

// style import
import styles from './NavIcons.module.css';

// material-ui icons
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// utils
import Toast from '../Toast';
import handleLogin from '../../utils/handleLogin';
import handleLogout from '../../utils/handleLogout';

// component
export default function NavIcons({ handleTargetPage, handleUserData, handleLogoutWhileInAccount }) {

    // states
    const [token, setToken] = useState('');               // State to store the token from localStorage
    const [email, setEmail] = useState('');               // State to store the email input value
    const [password, setPassword] = useState('');         // State to store the password input value
    const [showLogin, setShowLogin] = useState(false);    // State to control the visibility of the login form
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to store the login status of the user
    const [toastMessage, setToastMessage] = useState(''); // State to store the toast message

    // refs
    const loginContainerRef = useRef(null); // ref to loginContainer div

    // handles clicks outside of loginContainer div to close login form
    const handleClickOutside = (e) => {
        if (loginContainerRef.current && !loginContainerRef.current.contains(e.target)) {
            toggleLoginBox(); // Toggle the visibility of the login form
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside); // add event listener to handle clicks outside of loginContainer div
        return () => {
            document.removeEventListener('click', handleClickOutside); // remove event listener to handle clicks outside of loginContainer div
        }
    }, []);


    // check userData and jwtToken in localStorage on page load
    useEffect(() => {
        if (typeof window !== 'undefined') { // checks if window is defined (vercel needs this to build)
            if (!token && localStorage.getItem('jwtToken')) { // checks if there is no token in state, but there is a token in localStorage (user is logged in but token missing due to page refresh)
                const newToken = localStorage.getItem('jwtToken'); // get token from localStorage
                const userData = JSON.parse(localStorage.getItem('userData')); // get userData from localStorage
                handleUserData(userData); // set userData in state
                setToken(newToken); // set token in state
            }
        }
        if (token){
            setIsLoggedIn(true); // Set isLoggedIn to true if token exists
        }
    }, [token]); // use token as a dependency to trigger the useEffect hook when token changes

    // used to toggle the visibility of the login form on icon click
    const toggleLoginBox = () => {
        setShowLogin(!showLogin); // Toggle the visibility of the login form
    };

    // handles email input and updates email state
    const handleEmailChange = (e) => {
        const correctedEmail = e.target.value.toLowerCase(); // email addresses are case sensitive, so we need to make sure they are all lowercase
        setEmail(correctedEmail); // Update the email input value
    };

    // handles password input and updates password state
    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // Update the password input value, this is not needed, but it is here for consistency with email
    };

    // handles login form submission when login button is clicked
    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (don't refresh the page)
        await handleLogin(email, password); // Call handleLogin to login the user
        const newToken = localStorage.getItem('jwtToken'); // Get the token from localStorage
        const userData = JSON.parse(localStorage.getItem('userData')); // Get the userData from localStorage
        handleUserData(userData); // Call handleUserData to set the userData in state
        setToken(newToken); // Set the token in state
        if (!newToken) {
            toggleLoginBox(); // Toggle the visibility of the login form if login fails
        }
        setIsLoggedIn(true); // Set isLoggedIn to true if login is successful to render the "logout/account" icons
        setShowLogin(false); // Toggle the visibility of the login form if login is successful
        showToast(`Welcome back ${userData.firstName}`); // Show a toast message to welcome the user
    };

    // handles logout form submission when logout icon is clicked
    const handleLogoutSubmit = () => {
        handleLogout(); // Call handleLogout to logout the user
        showToast('You have been logged out')
        setToken(''); // Set token to an empty string to render the "login/sign up" icons
        handleUserData(null); // Call handleUserData to remove the userData from state
        setIsLoggedIn(false); // Set isLoggedIn to false to render the "login/sign up" icons
        handleLogoutWhileInAccount(); // Call handleLogoutWhileInAccount to set the activeView to "Homepage" if the user is on the "Account" page
    };

    const handleSignupClick = () => {
        handleTargetPage('Signup');
        toggleLoginBox();
    }

    // login form component
    const loginForm = (
        <div ref={loginContainerRef} className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
                <h1 className={styles.loginHeader}>Welcome Back Viewer</h1>
                <input className={styles.loginInput} type="email" autoComplete="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                <input className={styles.loginInput} type="password" autoComplete="current-password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <div className={styles.loginButtons}>
                    <button className={styles.loginButton} type="submit">Login</button>
                    <button className={styles.loginButton} onClick={toggleLoginBox}>Cancel</button>
                </div>
                <div className={styles.loginFooter}>
                    <p className={styles.loginFooterText}>Don't have an account?</p>
                    <button className={styles.loginFooterButton} onClick={handleSignupClick}>Sign Up</button>
                </div>
            </form>
        </div>
    );

    // array of icon data, used to render icons and text in navbar based on login status
    const iconData = [
        { iconClickValue: 'Homepage', icon: <HomeIcon className={styles.icon} />,          text: 'Home'    },
        { iconClickValue: 'Explore',  icon: <TravelExploreIcon className={styles.icon} />, text: 'Explore' },
        isLoggedIn
            ? { iconClickValue: 'Account',  icon: <AccountBoxIcon className={styles.icon} />,    text: 'Account' }
            : { iconClickValue: 'Signup',  icon: <PersonAddIcon className={styles.icon} />,    text: 'Sign Up' },
        isLoggedIn
            ? { iconClickValue: 'Logout',   icon: <LogoutIcon className={styles.icon} onClick={handleLogoutSubmit} />,    text: 'Logout'  }
            : { iconClickValue: 'Login',    icon: <LoginIcon className={styles.icon} />,    text: 'Login'   },
    ];

    // shows toast message
    const showToast = (message) => {
        setToastMessage(message);
    };

    // hides toast message
    const hideToast = () => {
        setToastMessage('');
    };

    // return component
    return (
        <div className={styles.container}>
            {iconData.map((target, index) => (
                <div
                    key={index}
                    className={`${styles.iconContainer} ${styles[target.iconClickValue.toLowerCase()]}`}
                    onClick={() => {
                        if (target.iconClickValue === 'Login') {
                            toggleLoginBox(); // Toggle the visibility of the login form when Login icon is clicked
                        } else if (target.iconClickValue === 'Logout') {
                            handleLogout; // Logout the user when Logout icon is clicked
                        } else {
                            handleTargetPage(target.iconClickValue);
                        }
                    }}
                >
                    {target.icon}
                    {target.text}
                </div>
            ))}
            {showLogin && loginForm} {/* Render the login form when showLogin is true */}
            {toastMessage && <Toast message={toastMessage} onDismiss={hideToast} />}
        </div>
    );
}
