// MovieDetailsModal.js
import React from 'react';
import style from '../styles/MovieDetailsModal.module.css'; // Create a CSS file for modal styles
import MovieDetails from './MovieDetails';

export default function MovieDetailsModal({ movieId, onClose, renderContent }) {
    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <button className={style.closeButton} onClick={onClose}>
                    <span className={style.closeIcon}>X</span>
                </button>
                {movieId && (
                <MovieDetails movie={movieId}/>
                )}
            </div>
                {renderContent && renderContent()}
        </div>
    );
}
