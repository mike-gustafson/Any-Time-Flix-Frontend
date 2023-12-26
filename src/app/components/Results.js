import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from '../styles/Results.module.css';
import MovieDetailsModal from './MovieDetailsModal';
import DimmingFilter from './DimmingFilter'; // Import the DimmingFilter component


export default function Results({ resultsLength, resultsRoute }) {
  const [data, setData] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedLearnMore, setClickedLearnMore] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${resultsRoute}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleBoxClick = (id) => {
    if (selectedMovieId === id) {
      setSelectedMovieId(null); // Close the expanded box
    } else {
      setSelectedMovieId(id); // Expand the clicked box
    }
    setClickedLearnMore(null); // Close the modal
    setIsModalOpen(false);
  };

  const handleLearnMoreClick = (id) => {
    setClickedLearnMore(id); // Set the movie ID to open the modal
    setIsModalOpen(true);
  };

  if (!data) return <p>Loading or no data available...</p>;

  return (
    <div className={style.container}>
      {isModalOpen && <DimmingFilter onClose={() => setIsModalOpen(false)} />}

      {data.results.slice(0, resultsLength).map((movie) => (
        <div
          key={movie.id}
          className={selectedMovieId === movie.id ? style.expandedBox : style.box}
          onClick={() => handleBoxClick(movie.id)}
        >
          <div className={style.imageContainer}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              width={175}
              height={262.5}
              className={style.image}
              alt={`${movie.title}`}
            />
            {selectedMovieId === movie.id ? (
              <div
                className={style.detailsLink}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLearnMoreClick(movie.id);
                }}
              >
                Learn More
              </div>
            ) : null}
          </div>
          {selectedMovieId === movie.id ? (
            <div className={style.details}>
              <div className={style.titleContainer}>
                <span className={style.title} title={movie.title}>
                  {movie.title}
                </span>
              </div>
              <div className={style.summaryContainer}>
                <span className={style.summary}>{movie.overview}</span>
              </div>
              <div className={style.infoContainer}>
                <span className={style.stat}>
                  Rating: {movie.vote_average.toFixed(1)}
                </span>
                <span className={style.stat}>
                  Released: {(new Date(movie.release_date)).toLocaleDateString()}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ))}
      {isModalOpen ? (
        <MovieDetailsModal
          movieId={clickedLearnMore}
          onClose={() => setIsModalOpen(false)}
          renderContent={() => (
            <div>
              {/* Additional content for "Learn More" in the modal */}
            </div>
          )}
        />
      ) : null}
    </div>
  );
}
