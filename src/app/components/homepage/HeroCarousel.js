import { useEffect, useState } from 'react';

import styles from './HeroCarousel.module.css';

import { NavigateNext }   from '@mui/icons-material';
import { NavigateBefore } from '@mui/icons-material';

import MovieDetailsModal from '../modal/MovieDetailsModal';

export default function HeroCarousel({ 
    movies,             // used here:                           array of movies to display
    handleModalOpen,    // used here and passed to children:    open modal with movie details
    handleModalClose    // used here and passed to children:    close modal
}) {
    
    // state to track current slide
    const [currentSlide, setCurrentSlide] = useState(0);
    const [carouselShift, setCarouselShift] = useState(1280);

    // hooks and props to pass to child components
    const movieDetailsModalHooks = { handleModalClose: handleModalClose, handleModalOpen: handleModalOpen }
    const movieDetailsModalProps = { movieId: movies[currentSlide].id }

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
            if (window.innerWidth < 1280) {
                setCarouselShift(window.innerWidth);
            } else {
                setCarouselShift(1280);
            }
    }

    // iterate through movies array and data in overlay on each slide
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
                <h1 
                    className={styles.infoTitle} 
                    onClick={() => handleModalOpen(<MovieDetailsModal {...movieDetailsModalProps} {...movieDetailsModalHooks} />)}
                >
                    {movie.title}
                </h1>
                <div className={styles.infoOverview}>
                    {movie.overview}
                </div>
            </div>
        </div>
    ));

    return (
            <div className={styles.carousel}>
                <div 
                    className={styles.navArrowLeft} 
                    onClick={handlePrevious}
                >
                    <NavigateBefore className={styles.navArrow} />
                </div>
                {listItems}
                <div 
                    className={styles.navArrowRight} 
                    onClick={handleNext}
                >
                    <NavigateNext className={styles.navArrow} />
                </div>
            </div>
    );
}