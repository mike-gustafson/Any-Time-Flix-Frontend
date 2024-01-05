import React from "react";
import style from "../styles/Homepage.module.css";
import Login from "../users/login/page";

export default function Homepage({handleTabChange}) {
    return (
        <div className={style.container}>
            <section className={style.infoBlock}>
                <h2>Tech Stack</h2>
                <p>
                    Our app is powered by a cutting-edge tech stack to provide you with
                    the best experience:
                </p>
                <ul>
                    <li>React for the interactive user interface</li>
                    <li>Node.js and Express for robust server-side operations</li>
                    <li>MongoDB for secure and scalable data storage</li>
                    <li>Authentication with JWT for your data's protection</li>
                    <li>Webpack for optimized asset management</li>
                    <li>Modern CSS/SASS for elegant styling</li>
                </ul>
            </section>
            <section className={style.infoBlock}>
                <h2>App Functionality</h2>
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
                    Ready to get started? Join our community and enjoy the world of
                    movies!
                </p>
                <button className="cta-button">Sign Up</button>
                <button className="cta-button">Log In</button>
            </section>
            <section className={style.infoBlock}>
                <Login  handleTabChange={handleTabChange}/>
            </section>
        </div>
    );
};