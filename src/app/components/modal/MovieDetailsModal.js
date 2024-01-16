import React, { useEffect } from 'react';

import style from './MovieDetailsModal.module.css';

import MovieDetails from './MovieDetails';

export default function MovieDetailsModal({ 
    movieId,            // used here:                           movie id to fetch details
    handleModalOpen,    // used here and passed to children:    open modal with movie details
    handleModalClose,   // used here and passed to children:    close modal
}) {

    useEffect(() => {
        // When the modal opens, add a class to the body to prevent scrolling
        document.body.classList.add('modal-open');

        // When the modal is closed, remove the class to re-enable scrolling
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    return (
        <div className={style.modalBody}>
            <button 
                className={style.closeButton} 
                onClick={() => {handleModalClose()}}
            >
                <span className={style.closeIcon}>
                    X
                </span>
            </button>
            {movieId && (<MovieDetails movieId={movieId} />)}
        </div>
    );
}
