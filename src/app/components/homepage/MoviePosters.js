import React, { useState } from 'react';
import styles from './MoviePosters.module.css';
import MovieDetailsModal from '../modal/MovieDetailsModal';

export default function MoviePosters({ movies, handleModalOpen, handleModalClose, }) {

    // handle click on movie poster
    const handleMovieClick = (title, id) => {
        console.log('user clicked on movie poster for', title)
        console.log(id)
        handleModalOpen(<MovieDetailsModal movieId={id} onClose={handleModalClose} />);
    }

    // iterate through movies array and display a list of titles
    const listItems = movies.map((movie, index) => 
        <div className={styles.movie} key={index} onClick={() => handleMovieClick(movie.title, movie.id)}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className={styles.poster} />
        </div>
    );

    // render list of titles to page
    return (
        <div className={styles.container}>
            {listItems}
        </div>
    );
}
