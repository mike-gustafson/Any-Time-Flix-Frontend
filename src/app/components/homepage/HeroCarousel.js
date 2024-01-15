import { useEffect, useState } from 'react';

import styles from './HeroCarousel.module.css';

import { NavigateBefore } from '@mui/icons-material';
import { NavigateNext } from '@mui/icons-material';

import MovieDetailsModal from '../modal/MovieDetailsModal';

export default function HeroCarousel({ movies, handleModalOpen, handleModalClose }) {
console.log(movies)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [carouselShift, setCarouselShift] = useState(1280);

    // shift carousel to next slide to the right
    const handleNext = () => {
        if (currentSlide === movies.length - 1) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    }

    // shift carousel to next slide to the left
    const handlePrevious = () => {
        if (currentSlide === 0) {
            setCurrentSlide(movies.length - 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    }

    // use window width to determine carousel transform amount
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    // set carousel shift amount based on window width
    const handleResize = () => {
        const windowWidth = window.innerWidth;
            if (windowWidth < 1280) {
                setCarouselShift(windowWidth);
            } else {
                setCarouselShift(1280);
            }
    }

    // handle click on movie
    const handleMovieClick = (title, id) => {
        console.log('user clicked on movie poster for', title)
        console.log(id)
        handleModalOpen(<MovieDetailsModal movieId={id} onClose={handleModalClose} />);
    }

    // iterate through movies array and display a list of titles
    const listItems = movies.map((movie, index) => (
        <div
            key={index}
            className={styles.movie}
            style={{ transform: `translateX(-${currentSlide * carouselShift}px)` }}
        >
            <div className={styles.backgroundImage}>
                <img
                    src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                    alt={movie.title}
                    className={styles.image}
                />
            </div>
            <div className={styles.movieInfoOverlay}>
                <h1 className={styles.infoTitle} onClick={() => handleMovieClick(movie.title, movie.id)}>{movie.title}</h1>
                <div className={styles.infoOverview}>{movie.overview}</div>
            </div>
        </div>
    ));



    
    return (
            <div className={styles.carousel}>
                <div className={styles.navArrowLeft} onClick={handlePrevious}>
                    <NavigateBefore className={styles.navArrow} />
                </div>
                {listItems}
                <div className={styles.navArrowRight} onClick={handleNext}>
                    <NavigateNext className={styles.navArrow} />
                </div>
            </div>
    );
}