import axios from "axios";

// imports
import React, { useState, useEffect } from "react";

// style import
import style from "./Homepage.module.css";

// components import
import HeroCarousel from "./HeroCarousel";
import HomepageMovieDisplay from "./HomepageMovieDisplay";
import { parse } from "path";

// component
export default function Homepage({ handleTargetPage, handleSearch }) {

    const [popularMovies, setPopularMovies] = useState(null);
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [topSearches, setTopSearches] = useState(null);

    // Use useEffect to fetch popular movies when the component mounts
    useEffect(() => {
        const getPopularMovies = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/movies/popular/1`
                );
                const returnedMovies = response.data.results;
                setPopularMovies(returnedMovies);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        };
        const getTopRatedMovies = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/movies/top-rated/1`
                );
                const returnedMovies = response.data.results;
                setTopRatedMovies(returnedMovies);
            } catch (error) {
                console.error("Error fetching top rated movies:", error);
            }
        }
        const getPopularSearches = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/searches/top25`
                );
                const returnedSearchTerms = response.data.response;
                setTopSearches(returnedSearchTerms);
            } catch (error) {
                console.error("Error fetching top rated movies:", error);
            }
        }
        getPopularMovies();
        getTopRatedMovies();
        getPopularSearches();
    }, []);

    // rerender page when popularMovies changes
    useEffect(() => {
    }, [popularMovies, topRatedMovies, topSearches]);

    


    const renderPopularMovies = () => {
        if (popularMovies) {
            return <HomepageMovieDisplay movies={popularMovies} />;
        } else {
            return <p>Loading...</p>;
        }
    };
    const renderTopRatedMovies = () => {
        if (topRatedMovies) {
            return <HomepageMovieDisplay movies={topRatedMovies} />;
        } else {
            return <p>Loading...</p>;
        }
    }
    const renderTopSearches = () => {
        if (topSearches) {
            return (
                <ul className={style.topQueries}>
                    {topSearches.map((search, index) => (
                        <li className={style.topQuery} key={index} >({search.timesQueried}) {search.query}</li>
                    ))}
                </ul>
            )
        } else {
            return <p>Loading...</p>;
        }
    }
    const renderHeroCarousel = () => {
        if (popularMovies) {
            return <HeroCarousel movies={popularMovies} />;
        } else {
            return <p>Loading...</p>;
        }
    }

    const iterateThroughUserData = () => {
        if (!localStorage.getItem('userData')) {
            return (
                <p>no user data</p>
            );
        } else {
        const userData = JSON.parse(localStorage.getItem('userData'));
        // list all keys in userData and create an array of them then list the items in a list on the page
        const keys = Object.keys(userData);
        const listItems = keys.map(key => <li key={key}>{key}</li>);
        return (
            <ul>{listItems}</ul>
        );          
    }}

    return (
        <div className={style.container}>

            <div className={style.heroSection}>
                {renderHeroCarousel()}
            </div>

            <div className={style.movieScrollBoxColumn}>
                <div className={style.movieScrollBox}>
                    <div className={style.movieScrollBoxCategory}>
                        <h2 className={style.movieScrollBoxHeading}>Popular</h2>
                        {renderPopularMovies()}
                    </div>
                </div>
                <div className={style.movieScrollBox}>
                    <div className={style.movieScrollBoxCategory}>
                        <h2 className={style.movieScrollBoxHeading}>Top Rated</h2>
                        {renderTopRatedMovies()}
                    </div>
                </div>
            </div>
            <div className={style.recentSearchesColumn}>
                <h2 className={style.heading}>Popular Searches</h2>
                {renderTopSearches()}
            </div>

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
        </div>
    );
};