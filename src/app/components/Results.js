import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import style from '../styles/Results.module.css';

import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
            const updatedUserData = { ...userData };
            const index = updatedUserData[listType].findIndex((savedMovie) => savedMovie.id === movieId);
    
            if (index !== -1) {
                // Movie is already in the list, remove it
                updatedUserData[listType].splice(index, 1); // Remove the movie from the list
            } else {
                // Movie is not in the list, add it
                updatedUserData[listType] = [...updatedUserData[listType], movieToAdd];
            }
    
            axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/addToList/${listEndpoint}`, { movie: updatedUserData[listType] })
                .then((response) => {
                    setUserData(updatedUserData);
                    const message = index !== -1
                        ? `${movieToAdd.original_title} removed from your ${listType} movies`
                        : `${movieToAdd.original_title} added to your ${listType} movies`;
                    showToast(message);
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
                            {isMovieInList('watchList', movie.id) ? (
                                <BookmarkRemoveIcon className={style.redIcon} />
                            ) : (
                                <BookmarkAddOutlinedIcon />
                            )}
                        </div>
                        <div
                            className={style.addToWatchedList}
                            onClick={(event) => handleAddToListClick(event, 'watched', movie.id)}
                            title="Add to Watched"
                        >
                            {isMovieInList('watched', movie.id) ? (
                                <RemoveRedEyeIcon className={style.redIcon} />
                            ) : (
                                <RemoveRedEyeOutlinedIcon />
                            )}
                        </div>
                        <div
                            className={style.addToLiked} 
                            onClick={(event) => handleAddToListClick(event, 'liked', movie.id)}
                            title="Add to Liked"
                        >
                            {isMovieInList('liked', movie.id) ? (
                                <FavoriteIcon className={style.redIcon} />
                            ) : (
                                <FavoriteBorderOutlinedIcon />
                            )}
                        </div>
                        <div 
                            className={style.addToDisliked} 
                            onClick={(event) => handleAddToListClick(event, 'disliked', movie.id)}    
                            title="Add to Disliked"
                        >
                            {isMovieInList('disliked', movie.id) ? (
                                <HeartBrokenIcon className={style.redIcon} />
                            ) : (
                                <HeartBrokenOutlinedIcon />
                            )}
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
