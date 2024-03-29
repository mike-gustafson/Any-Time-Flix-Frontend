import React, { useEffect } from 'react';
import style from '../styles/MovieDetailsModal.module.css';
import MovieDetails from './MovieDetails';

export default function MovieDetailsModal({ movieId, onClose, toggleFilter, userData }) {
    useEffect(() => {
        // When the modal opens, add a class to the body to prevent scrolling
        document.body.classList.add('modal-open');

        // When the modal is closed, remove the class to re-enable scrolling
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    return (
        <div className={style.modalOverlay} >
            <div className={style.modalContent}>
                <button className={style.closeButton} onClick={() => {
                    onClose();
                }}>
                    <span className={style.closeIcon}>X</span>
                </button>
                {movieId && (
                    <MovieDetails movie={movieId} toggleFilter={toggleFilter} userData={userData}/>
                )}
            </div>
        </div>
    );
}
