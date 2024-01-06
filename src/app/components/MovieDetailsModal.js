import React from 'react';
import style from '../styles/MovieDetailsModal.module.css';
import MovieDetails from './MovieDetails';

export default function MovieDetailsModal({ movieId, onClose, toggleFilter, userData }) {
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
