import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import style from '../styles/Results.module.css';
import MovieDetailsModal from './MovieDetailsModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';

export default function Results({ resultsLength, resultsRoute, toggleFilter, userData, setUserData }) {
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

    const handleAddToWatchListClick = (event, movieId) => {
        event.stopPropagation();
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const movieToAdd = data.results.find(movie => movie.id === movieId);
            if (!movieToAdd) {
                console.error('Movie not found');
                return;
            }
            axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/addToList/watchList/${userData.userData._id}`, { movie: movieToAdd })
                .then(response => {
                    setUserData({
                        ...userData,
                        userData: {
                            ...userData.userData,
                            watchList: [...userData.userData.watchList, movieToAdd]
                        }
                    });
                    alert(`Movie ${movieId} added to ${userData.userData.firstName} ${userData.userData.lastName}'s account`);
                }).catch(error => {
                    console.error('Error updating watchlist', error);
                });
        } else {
            window.location.href = '/users/login';
        }
    };

    const handleAddToWatchedListClick = (event, movieId) => {
        event.stopPropagation();
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const movieToAdd = data.results.find(movie => movie.id === movieId);
            if (!movieToAdd) {
                console.error('Movie not found');
                return;
            }
            axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/addToList/watched/${userData.userData._id}`, { movie: movieToAdd })
                .then(response => {
                    setUserData({
                        ...userData,
                        userData: {
                            ...userData.userData,
                            watched: [...userData.userData.watched, movieToAdd]
                        }
                    });
                    alert(`Movie ${movieId} added to ${userData.userData.firstName} ${userData.userData.lastName}'s account`);
                }).catch(error => {
                    console.error('Error updating watched movies', error);
                });
        } else {
            window.location.href = '/users/login';
        }
    };

    const handleAddToLikedClick = (event, movieId) => {
        event.stopPropagation();
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const movieToAdd = data.results.find(movie => movie.id === movieId);
            if (!movieToAdd) {
                console.error('Movie not found');
                return;
            }
            axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/addToList/liked/${userData.userData._id}`, { movie: movieToAdd })
                .then(response => {
                    setUserData({
                        ...userData,
                        userData: {
                            ...userData.userData,
                            liked: [...userData.userData.liked, movieToAdd]
                        }
                    });
                    alert(`Movie ${movieId} added to ${userData.userData.firstName} ${userData.userData.lastName}'s account`);
                }).catch(error => {
                    console.error('Error updating liked movies', error);
                });
        } else {
            window.location.href = '/users/login';
        }
    }

    const handleAddToDislikedClick = (event, movieId) => {
        event.stopPropagation();
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const movieToAdd = data.results.find(movie => movie.id === movieId);
            if (!movieToAdd) {
                console.error('Movie not found');
                return;
            }
            axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/addToList/disliked/${userData.userData._id}`, { movie: movieToAdd })
                .then(response => {
                    setUserData({
                        ...userData,
                        userData: {
                            ...userData.userData,
                            disliked: [...userData.userData.disliked, movieToAdd]
                        }
                    });
                    alert(`Movie ${movieId} added to ${userData.userData.firstName} ${userData.userData.lastName}'s account`);
                }).catch(error => {
                    console.error('Error updating disliked movies', error);
                });
        } else {
            window.location.href = '/users/login';
        }
    }

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
                            onClick={(event) => handleAddToWatchListClick(event, movie.id)}
                            title="Add to Watchlist"
                        >
                            <AddIcon />
                        </div>
                        <div
                            className={style.addToWatchedList}
                            onClick={(event) => handleAddToWatchedListClick(event, movie.id)}
                            title="Add to Watched"
                        >
                            <RemoveRedEyeOutlinedIcon />
                        </div>
                        <div 
                            className={style.addToLiked} 
                            onClick={(event) => handleAddToLikedClick(event, movie.id)}
                            title="Add to Liked"
                        >
                            <FavoriteBorderOutlinedIcon />
                        </div>
                        <div 
                            className={style.addToDisliked} 
                            onClick={(event) => handleAddToDislikedClick(event, movie.id)}    
                            title="Add to Disliked"
                        >
                            <HeartBrokenOutlinedIcon />
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
