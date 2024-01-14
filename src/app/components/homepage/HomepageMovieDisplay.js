import React from 'react';
import styles from './HomepageMovieDisplay.module.css';

export default function HomepageMovieDisplay({ movies }) {
    // iterate through movies array and display a list of titles
    const listItems = movies.map((movie, index) => 
        <div className={styles.movie} key={index}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className={styles.poster} />
        </div>
    );

    return (
        <div className={styles.container}>
            {listItems}
        </div>
    );
}
