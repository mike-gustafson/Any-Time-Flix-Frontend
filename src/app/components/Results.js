import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import style from '../styles/Results.module.css';

import AddIcon from '@mui/icons-material/Add';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Toast from './Toast';
import MovieDetailsModal from './MovieDetailsModal';

export default function Results({ resultsLength, resultsRoute, toggleFilter, userData, setUserData, handleTabChange }) {
    const [data, setData] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    useEffect(() => {
        fetchResultsData();
    }, [resultsRoute]);
    
    const fetchResultsData = () => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${resultsRoute}`)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching results data:', error));
    };

    const showToast = (message) => {
        setToastMessage(message);
    };

    const hideToast = () => {
        setToastMessage('');
    };

    const handleBoxClick = (id) => {
        setSelectedMovieId((prevId) => (prevId === id ? null : id));
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
                userData={userData}
            />
        );
    };

    const isMovieInList = (listType, movieId) => {
        const activeList = userData[listType];
        for (const savedMovie of activeList) {
            if (savedMovie.id == movieId) {
                return true;
            }
        }
        return false;
    };

    const handleAddToListClick = (event, listType, movieId) => {
        event.stopPropagation();
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const movieToAdd = data.results.find((movie) => movie.id === movieId);
            if (!movieToAdd) {
                console.error('Movie not found');
                return;
            }
            const listEndpoint = `${listType}/${userData._id}`;
            axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/addToList/${listEndpoint}`, { movie: movieToAdd })
                .then((response) => {
                    const updatedUserData = { ...userData };
                    updatedUserData[listType] = [...updatedUserData[listType], movieToAdd];
                    setUserData(updatedUserData);
                    showToast(`Movie ${movieToAdd.original_title} added to your ${listType} movies`);
                })
                .catch((error) => {
                    console.error(`Error updating ${listType} movies`, error);
                });
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
                            onClick={(event) => handleAddToListClick(event, 'watchList', movie.id)}
                            title="Add to Watchlist"
                        >
                            <AddIcon className={isMovieInList('watchList', movie.id) ? style.redIcon : ''} />
                        </div>
                        <div
                            className={style.addToWatchedList}
                            onClick={(event) => handleAddToListClick(event, 'watched', movie.id)}
                            title="Add to Watched"
                        >
                            <RemoveRedEyeOutlinedIcon className={isMovieInList('watched', movie.id) ? style.redIcon : ''} />
                        </div>
                        <div
                            className={style.addToLiked} 
                            onClick={(event) => handleAddToListClick(event, 'liked', movie.id)}
                            title="Add to Liked"
                        >
                            <FavoriteBorderOutlinedIcon className={isMovieInList('liked', movie.id) ? style.redIcon : ''} />
                        </div>
                        <div 
                            className={style.addToDisliked} 
                            onClick={(event) => handleAddToListClick(event, 'disliked', movie.id)}    
                            title="Add to Disliked"
                        >
                            <HeartBrokenOutlinedIcon className={isMovieInList('disliked', movie.id) ? style.redIcon : ''} />
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
            {toastMessage && <Toast message={toastMessage} onDismiss={hideToast} />}
        </div>
    );
}
