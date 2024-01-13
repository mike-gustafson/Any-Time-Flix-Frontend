import React from "react";
import style from "../styles/Homepage.module.css";
import Login from "./Login";
import handleLogout from "../utils/handleLogout";

export default function Homepage({ handleTargetPage, handleUserData }) {


    const renderLogin = () => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('jwtToken')) {
                return (
                    <>
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
                    </>
                )
            } else {
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
                {renderLogin()}
            </section>
        </div>
    );
};