import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from '../styles/Results.module.css';
import MovieDetailsModal from './MovieDetailsModal';

export default function Results({ resultsLength, resultsRoute }) {
    const [data, setData] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedLearnMore, setClickedLearnMore] = useState(null);
    const [modalComponent, setModalComponent] = useState(null); // State for the modal component

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${resultsRoute}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    const handleMovieClick = (id, isLearnMoreClick) => {
        if (selectedMovieId === id) {
            if (!isLearnMoreClick) {
                setSelectedMovieId(null);
                setIsModalOpen(false);
                setModalComponent(null); // Clear the modal component
            } else {
                setClickedLearnMore(id);
                setIsModalOpen(true);
                setModalComponent(
                    <MovieDetailsModal
                        movieId={id}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedMovieId(null);
                            setModalComponent(null);
                        }}
                    />
                );
            }
        } else {
            setSelectedMovieId(id);
            setIsModalOpen(false);
            setModalComponent(null); // Clear the modal component for other movies
        }
        setClickedLearnMore(null);
    };

    if (!data) return <p>Loading or no data available...</p>;

    return (
        <div className={style.container}>
            {data.results.slice(0, resultsLength).map((movie) => (
                <div
                    key={movie.id}
                    className={selectedMovieId === movie.id ? style.expandedBox : style.box}
                    onClick={() => handleMovieClick(movie.id, false)}
                >
                    <div className={style.imageContainer}>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            width={175}
                            height={262.5}
                            className={style.image}
                            alt={`${movie.title}`}
                        />
                        {selectedMovieId === movie.id ? (
                            <div
                                className={style.detailsLink}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMovieClick(movie.id, true);
                                }}
                            >
                                Learn More
                            </div>
                        ) : null}
                    </div>
                    {selectedMovieId === movie.id ? (
                        <div className={style.details} onClick={() => handleMovieClick(movie.id)}>
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
                    ) : null}
                </div>
            ))}
            {modalComponent}
        </div>
    );
}
