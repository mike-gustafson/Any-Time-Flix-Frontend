// imports
import React, { useState, useEffect } from "react";

// style import
import style from "./Homepage.module.css";

// components import
import HeroCarousel from "./HeroCarousel";
import MoviePosters from "./MoviePosters";

// utils imports
import getPopularMovies from "../../utils/server_calls/getPopularMovies";   // takes (number of pages to fetch, starting page number)
import getTopRatedMovies from "../../utils/server_calls/getTopRatedMovies"; // takes (number of pages to fetch, starting page number)
import getPopularSearches from "../../utils/server_calls/getPopularSearchs";// takes no arguments

// component
export default function Homepage({ handleModalClose, handleModalOpen }) {

    // states to store fetched data
    const [popularMovies, setPopularMovies] = useState(null);
    const [topRatedMovies, setTopRatedMovies] = useState(null);
    const [topSearches, setTopSearches] = useState(null);

    // hooks to pass to child components
    const heroCarouselHooks = {handleModalClose: handleModalClose, handleModalOpen: handleModalOpen}
    const moviePostersHooks = {handleModalClose: handleModalClose, handleModalOpen: handleModalOpen}
    

    // Use useEffect to fetch movies when the component mounts
    useEffect(() => {
        // populates states with fetched data
        const asyncFetchs = async () => {
            try {
                setPopularMovies(await getPopularMovies(2, 1));
                setTopRatedMovies(await getTopRatedMovies(2, 1));
                setTopSearches(await getPopularSearches());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        asyncFetchs();
    }, []);

    // rerender page when states change
    useEffect(() => {
    }, [popularMovies, topRatedMovies, topSearches]);


    
    const renderFetchedMovies = () => {    
        if (popularMovies !== null && topRatedMovies !== null) {
            const movies = [popularMovies, topRatedMovies]
                .reduce((acc, val) => acc.concat(val), [])
                .sort(() => Math.random() - 0.5)
                .slice(0, 64);        
            return <MoviePosters movies={movies} {...moviePostersHooks}/>;
        } else {
            return <p>Loading...</p>;
        }
    };

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
            return <HeroCarousel movies={popularMovies} {...heroCarouselHooks} />;
        } else {
            return <p>Loading...</p>;
        }
        }   
    

    return (
        <div className={style.container}>

            <div className={style.heroSection}>
                {renderHeroCarousel()}
            </div>

            <div className={style.movieSmallPosters}>
                <h2 className={style.heading}>
                    Any Time Flix is your home a finding old and new favorite movies and where to watch them.
                </h2>
                <p className={style.subheading}>
                    Here's some of our favorites to help you get started:
                </p>
                {renderFetchedMovies()}
                <p className={style.subheading}>
                    Click on a poster to learn more
                </p>
            </div>

            <div className={style.recentSearchesColumn}>
                <h2 className={style.heading}>Popular Searches</h2>
                {renderTopSearches()}
            </div>

            <section className={style.infoBlock}>
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