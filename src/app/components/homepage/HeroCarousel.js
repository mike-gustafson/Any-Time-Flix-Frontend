import styles from './HeroCarousel.module.css';
import { useState } from 'react';

import { NavigateBefore } from '@mui/icons-material';
import { NavigateNext } from '@mui/icons-material';


export default function HeroCarousel({ movies }) {


    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        if (currentSlide === movies.length - 1) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    }

    const handlePrevious = () => {
        if (currentSlide === 0) {
            setCurrentSlide(movies.length - 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    }

    const listItems = movies.map((movie, index) => (
        <div
            key={index}
            className={styles.movie}
            style={{ transform: `translateX(-${currentSlide * 1280}px)` }} // Adjust the width as needed
        >
            <div className={styles.backgroundImage}>
                <img
                    src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                    alt={movie.title}
                    className={styles.poster}
                />
            </div>
            <div className={styles.movieInfoOverlay}>
                <h1 className={styles.infoTitle}>{movie.title}</h1>
                <div className={styles.infoOverview}>{movie.overview}</div>
            </div>
        </div>
    ));



    
    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <div className={styles.navArrowLeft} onClick={handlePrevious}>
                    <NavigateBefore className={styles.navArrow} />
                </div>
                {listItems}
                <div className={styles.navArrowRight} onClick={handleNext}>
                    <NavigateNext className={styles.navArrow} />
                </div>
            </div>
        </div>
    );
}