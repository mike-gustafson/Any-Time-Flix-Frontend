// imports
import React from "react";

// utils
import handleLogout from "../../utils/handleLogout";

// style import
import style from "./Homepage.module.css";

// component imports
import Login from "./Login";

// component
export default function Homepage({ handleTargetPage, handleUserData }) {

    const renderLogin = () => {
        if (typeof window !== 'undefined') { // checks if window is defined (vercel needs this to build)
            if (localStorage.getItem('jwtToken')) { // checks if there is a token in localStorage (user is logged in) and displays welcome message and logout button
                return (
                    <div>
                        <h2 className={style.heading}>Welcome!</h2>
                        <div onClick={() => {
                            handleTargetPage('Explore');
                        }}>
                            <h2>Click <span className={style.goToExplore}>Here</span> to Start Browsing</h2>
                        </div>
                        <button onClick={() => {
                            handleLogout();
                            handleTargetPage('Home');
                        }
                        }
                            className={style.logoutButton}
                        >Logout</button>
                    </div>
                )
            } else { // if there is no token in localStorage (user is not logged in) display login component
                return (
                    <Login
                        handleTargetPage={handleTargetPage}
                        handleUserData={handleUserData}
                    />
                )
            }
        }
    }

    return (
        <div className={style.container}>
            <section className={style.infoBlock}>
                <h2 className={style.heading}>Tech Stack</h2>
                <p>
                    Our app is powered by a cutting-edge tech stack to provide you with
                    the best experience:
                </p>
                <ul>
                    <li>React for the interactive user interface</li>
                    <li>Node.js and Express for robust server-side operations</li>
                    <li>MongoDB for secure and scalable data storage</li>
                    <li>Authentication with JWT for your datas protection</li>
                    <li>Webpack for optimized asset management</li>
                    <li>Modern CSS/SASS for elegant styling</li>
                </ul>
            </section>
            <section className={style.infoBlock}>
                <h2 className={style.heading}>App Functionality</h2>
                <p>
                    Discover what our app has to offer and simplify your movie
                    experience:
                </p>
                <ul>
                    <li>Search for movies and access detailed information</li>
                    <li>Explore the latest Now Playing and Popular movies</li>
                    <li>Receive personalized movie recommendations</li>
                    <li>Customize the number of results per page</li>
                </ul>
            </section>
            <section className={style.infoBlock}>
                <p>
                    Ready to get started? Click EXPLORE above to start browsing!
                </p>
            </section>
            <section className={style.infoBlock}>
                {renderLogin()} {/* renders login component or welcome message and logout button */}
            </section>
        </div>
    );
};