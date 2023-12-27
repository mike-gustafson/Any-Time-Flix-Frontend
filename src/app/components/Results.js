import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from '../styles/Results.module.css';
import MovieDetailsModal from './MovieDetailsModal';

export default function Results({ resultsLength, resultsRoute }) {
    const [data, setData] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [modalContent, setModalContent] = useState(null);
    
    // Fetches movie data from server based on results route
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${resultsRoute}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    // Expands or Collapses movie box on click
    const handleBoxClick = (id) => {
        if (selectedMovieId === id) {
            setSelectedMovieId(null)
        } else { 
            setSelectedMovieId(id)
        }
    };

    // Opens movie details in modal whe "Learn More" is clicked
    const handleLearnMoreClick = (id) => {
        setModalContent(<MovieDetailsModal movieId={id} onClose={() => { setModalContent(null) }}/>);
    };

    // placeholder while data is loading
    if (!data) return <p>Loading or no data available...</p>;

    // Renders results based on fetched data
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
                        
                        {selectedMovieId === movie.id ? (
                            <div
                                className={style.detailsLink}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleLearnMoreClick(movie.id);
                                }}
                            >
                                Learn More
                            </div>
                        ) : null}
                    </div>
                    
                    {selectedMovieId === movie.id ? (
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
                    ) : null}
                </div>
            ))}
            {modalContent}
        </div>
    );
}
