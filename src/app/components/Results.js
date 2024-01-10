import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import Image from 'next/image';

import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Toast from './Toast';
import MovieDetailsModal from './MovieDetailsModal';

import style from '../styles/Results.module.css';

export default function Results({ resultsRoute, toggleFilter, userData, setUserData }) {
    const [data,             setData]             = useState(null);
    const [selectedMovieId,  setSelectedMovieId]  = useState(null);
    const [modalContent,     setModalContent]     = useState(null);
    const [toastMessage,     setToastMessage]     = useState('');
    const [page,             setPage]             = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const containerRef = useRef(null);

    const scrollToTop = () => {
        console.log('scrolling to top')
        const container = window;
        if (container) {
            container.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsFirstLoad(false);
    }

    if (isFirstLoad) {
        scrollToTop();
    }

    useEffect(() => {
        setPage(1);
        checkForJwtToken();
    }, [resultsRoute]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${resultsRoute}${page}`)  
            .then((res) => res.json())
            .then((newData) => {
                if (page === 1) {
                    setData(newData);
                } else {
                    const appendedResults = [...data.results, ...newData.results];
                    const appendedData = { ...data, results: appendedResults };
                    setData(appendedData);
                }
            })
            .catch((error) => console.error('Error fetching results data:', error));
    }, [page, resultsRoute]);

    useEffect(() => {
        // Add an event listener to the container for infinite scrolling
        const container = containerRef.current;
        if (container) { container.addEventListener('scroll', handleScroll) }
        return () => {
            if (container) { container.removeEventListener('scroll', handleScroll) }
        };
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            if (scrollTop + windowHeight + 1 >= documentHeight) { // +1 is needed beacuse otherwise it will never reach the bottom
                setPage((prevPage) => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // not sure why, but both handleScroll functions are needed for infinite scrolling to work
    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = container.scrollTop;
            if (scrollTop + windowHeight + 1 >= documentHeight) {
                setPage((prevPage) => prevPage + 1);
            }
        }
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
        setModalContent(<MovieDetailsModal movieId={id} onClose={handleOnClose} toggleFilter={toggleFilter} userData={userData} />);
    };

    const checkForJwtToken = () => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken === null) {
            setUserData(null);
        }
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

    const handleListIconClick = (event, listType, movieId) => {
        event.stopPropagation();
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const movie = data.results.find((movie) => movie.id === movieId);
            const listEndpoint = `${listType}/${userData._id}`;

            if (!movie) {
                console.error('Movie not found');
                return;
            }

            if (isMovieInList(listType, movieId)) {
                axios
                    .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/removeFromList/${listEndpoint}`, { movie: movie })
                    .then((response) => {
                        setUserData(response.data);
                        const message = `${movie.title} removed from your ${listType} movies`;
                        showToast(message);
                    })
                    .catch((error) => {
                        console.error(`Error updating ${listType} movies`, error);
                    });
                return;
            } else {
                axios
                    .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/addToList/${listEndpoint}`, { movie: movie })
                    .then((response) => {
                        setUserData(response.data);
                        const isMovieAlreadyInList = response.data[listType].some((savedMovie) => savedMovie.id === movieId);
                        const message = isMovieAlreadyInList
                            ? `${movie.title} removed from your ${listType} movies`
                            : `${movie.title} added to your ${listType} movies`;
                        showToast(message);
                    })
                    .catch((error) => {
                        console.error(`Error updating ${listType} movies`, error);
                    });
            }
        }
    };

    if (!data) return <p>Loading or no data available...</p>;

    return (
        <div className={style.container} ref={containerRef}>
            {data.results.map((movie) => (
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
                        {userData && (
                            <div
                                className={style.addToWatchList}
                                onClick={(event) => handleListIconClick(event, 'watchList', movie.id)}
                                title="Add to Watchlist"
                            >
                                {isMovieInList('watchList', movie.id) ? (
                                    <BookmarkRemoveIcon className={style.redIcon} />
                                ) : (
                                    <BookmarkAddOutlinedIcon />
                                )}
                            </div>
                        )}
                        {userData && (
                            <div
                                className={style.addToWatchedList}
                                onClick={(event) => handleListIconClick(event, 'watched', movie.id)}
                                title="Add to Watched"
                            >
                                {isMovieInList('watched', movie.id) ? (
                                    <RemoveRedEyeIcon className={style.redIcon} />
                                ) : (
                                    <RemoveRedEyeOutlinedIcon />
                                )}
                            </div>
                        )}
                        {userData && (
                            <div
                                className={style.addToLiked}
                                onClick={(event) => handleListIconClick(event, 'liked', movie.id)}
                                title="Add to Liked"
                            >
                                {isMovieInList('liked', movie.id) ? (
                                    <FavoriteIcon className={style.redIcon} />
                                ) : (
                                    <FavoriteBorderOutlinedIcon />
                                )}
                            </div>
                        )}
                        {userData && (
                            <div
                                className={style.addToDisliked}
                                onClick={(event) => handleListIconClick(event, 'disliked', movie.id)}
                                title="Add to Disliked"
                            >
                                {isMovieInList('disliked', movie.id) ? (
                                    <HeartBrokenIcon className={style.redIcon} />
                                ) : (
                                    <HeartBrokenOutlinedIcon />
                                )}
                            </div>
                        )}
                        {selectedMovieId === movie.id && (
                            <button className={style.detailsLink} onClick={() => handleLearnMoreClick(movie.id)}>
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
                                <span className={style.stat}>Rating: {movie.vote_average.toFixed(1)}</span>
                                <span className={style.stat}>
                                    Released: {new Date(movie.release_date).toLocaleDateString()}
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
