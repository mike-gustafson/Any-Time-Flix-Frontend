import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import style from '../styles/Results.module.css';
import MovieDetailsModal from './MovieDetailsModal';

export default function Results({ resultsLength, resultsRoute, toggleFilter }) {
    const [data, setData] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${resultsRoute}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [resultsRoute]);

    const handleBoxClick = (id) => {
        setSelectedMovieId(selectedMovieId === id ? null : id);
    };

    const handleOnClose = () => {
        setModalContent(null);
        toggleFilter();
    };

    const handleLearnMoreClick = (id) => {
        toggleFilter();
        setModalContent(
            <MovieDetailsModal 
                movieId={id} 
                onClose={handleOnClose} 
                toggleFilter={toggleFilter}
            />
        );
    };

    const handleAddToWatchListClick = (movieId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const userData = jwtDecode(jwtToken);
            console.log(userData)
            alert(`Movie ${movieId} added to ${userData.firstName} ${userData.lastName}'s account`);
        } else {
            window.location.href = '/users/login';
        }
    };

    if (!data) return <p>Loading or no data available...</p>;

    return (
        <div className={style.container}>
            {data.results.slice(0, resultsLength).map((movie) => (
                <div
                    key={movie.id}
                    className={selectedMovieId === movie.id ? style.expandedBox : style.box}
                    onClick={() => handleBoxClick(movie.id)}
                >
                    <div className={style.imageContainer}>
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            width={175} 
                            height={262.5} 
                            className={style.image} 
                            alt={`${movie.title}`} 
                        />
                        <div 
                            className={style.addToWatchList} 
                            onClick={() => handleAddToWatchListClick(movie.id)}
                            title="Add to Watchlist"
                        >
                            +
                        </div>
                        {selectedMovieId === movie.id && (
                            <button
                                className={style.detailsLink}
                                onClick={() => handleLearnMoreClick(movie.id)}
                            >
                                Learn More
                            </button>
                        )}
                    </div>
                    {selectedMovieId === movie.id && (
                        <div className={style.details}>
                            <div className={style.titleContainer}>
                                <span className={style.title} title={movie.title}>
                                    {movie.title}
                                </span>
                            </div>
                            <div className={style.summaryContainer}>
                                <span className={style.summary}>{movie.overview}</span>
                            </div>
                            <div className={style.infoContainer}>
                                <span className={style.stat}>
                                    Rating: {movie.vote_average.toFixed(1)}
                                </span>
                                <span className={style.stat}>
                                    Released: {(new Date(movie.release_date)).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {modalContent}
        </div>
    );
}
