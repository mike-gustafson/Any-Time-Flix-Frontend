// imports
import React, { useState, useEffect } from "react";

// style import
import style from "./Homepage.module.css";

// components import
import HeroCarousel from "./HeroCarousel";
import MoviePosters from "./MoviePosters";

// utils imports
import getPopularMovies   from "../../utils/server_calls/getPopularMovies";  // takes (number of pages to fetch, starting page number)
import getTopRatedMovies  from "../../utils/server_calls/getTopRatedMovies"; // takes (number of pages to fetch, starting page number)
import getPopularSearches from "../../utils/server_calls/getPopularSearchs"; // takes no arguments

// component
export default function Homepage({ 
    handleModalClose, // passed to children:    heroCarousel and moviePosters
    handleModalOpen,  // passed to children:    heroCarousel and moviePosters
    handleSearch      // used here:             search for a popular search when popular search is clicked
}) {

    // states to store fetched data
    const [popularSearches, setPopularSearches] = useState(null);
    const [popularMovies,   setPopularMovies]   = useState(null);
    const [topRatedMovies,  setTopRatedMovies]  = useState(null);

    // hooks and props to pass to child components
    const heroCarouselHooks = { handleModalClose: handleModalClose, handleModalOpen: handleModalOpen }
    const moviePostersHooks = { handleModalClose: handleModalClose, handleModalOpen: handleModalOpen }

    // Use useEffect to fetch movies when the component mounts
    useEffect(() => {
        // populates states with fetched data
        const asyncFetchs = async () => {
            try {
                setPopularMovies(await getPopularMovies(2, 1));   // takes (number of pages to fetch, starting page number)
                setTopRatedMovies(await getTopRatedMovies(2, 1)); // takes (number of pages to fetch, starting page number)
                setPopularSearches(await getPopularSearches());   // takes no arguments
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        asyncFetchs();
    }, []);

// render functions for each section of the page.  Organized in order of appearance on page
    // renders the hero carousel section
    const renderHeroCarousel = () => {
        if (popularMovies) {
            return <HeroCarousel movies={popularMovies} {...heroCarouselHooks} />;
        } else {
            return <p>Loading...</p>;
        }
    }

    // renders the movie posters section
    const renderMoviePosters = () => {
        if (popularMovies !== null && topRatedMovies !== null) {
            const movies = [popularMovies, topRatedMovies]
                .reduce((acc, val) => acc.concat(val), [])
                .sort(() => Math.random() - 0.5)
                .slice(0, 64);
            return <MoviePosters movies={ movies } {...moviePostersHooks} />;
        } else {
            return <p>Loading...</p>;
        }
    };

    // renders the popular searches section
    const renderPopularSearches = () => {
        if (popularSearches) {
            return (
                <div className={style.topQueries}>
                    {popularSearches.map((search, index) => (
                        <span 
                            className={style.query} 
                            key={index} 
                            onClick={() => handleSearch(search.query)}
                        >
                            {search.query}
                        </span>
                    ))}
                </div>
            )
        } else {
            return <p>Loading...</p>;
        }
    }

// return the component
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
                    Here&apos;s some of our favorites to help you get started:
                </p>
                {renderMoviePosters()}
                <p className={style.subheading}>
                    Click on a poster to learn more
                </p>
            </div>
            <hr className={style.divider} />
            <div className={style.topSearches}>
                <h2 className={style.topSearchTitle}>
                    Popular Searches
                </h2>
                {renderPopularSearches()}
            </div>
        </div>
    );
};