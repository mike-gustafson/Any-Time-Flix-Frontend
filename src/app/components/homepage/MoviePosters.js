import React from 'react';
import styles from './MoviePosters.module.css';
import MovieDetailsModal from '../modal/MovieDetailsModal';

export default function MoviePosters({ 
    movies,             // used here:                         array of movies to display
    handleModalOpen,    // used here and passed to children:  open modal with movie details
    handleModalClose,   // used here and passed to children:  close modal
}) {

    // hooks and props to pass to child components
    const movieDetailsModalHooks = { handleModalOpen: handleModalOpen, handleModalClose: handleModalClose, handleModalOpen: handleModalOpen }

    // iterate through movies array and display a list of titles
    const listItems = movies.map((movie, index) => 
        <img 
            key={index} 
            alt={movie.title} 
            className={styles.poster} 
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            onClick={() => handleModalOpen(<MovieDetailsModal movieId={movie.id} {...movieDetailsModalHooks} />)}
        />
    );

    // render list of titles to page
    return (
        <div className={styles.container}>
            {listItems}
        </div>
    );
}
