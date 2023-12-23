import Image from 'next/image';
import { useState, useEffect } from 'react';
import style from '../styles/Results.module.css';

export default function Results({resultsLength, resultsRoute}) {
    const [data, setData] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${resultsRoute}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    const handleMovieClick = (id) => {
        if (selectedMovieId === id) {
            setSelectedMovieId(null); // Deselect if the same movie is clicked again
        } else {
            setSelectedMovieId(id);
        }
    };

    if (!data) return <p>Loading or no data available...</p>;
    return (
        <div className={style.container}>
            {data.results.slice(0, resultsLength).map((movie) => {
                const rating = movie.vote_average.toFixed(1);
                const releaseDate = new Date(movie.release_date);
                const formattedReleaseDate = `${(releaseDate.getMonth() + 1).toString().padStart(2, '0')}/${releaseDate.getDate().toString().padStart(2, '0')}/${releaseDate.getFullYear()}`;
                return (
                    <div key={movie.id} className={selectedMovieId === movie.id ? style.expandedBox : style.box} onClick={() => handleMovieClick(movie.id)}>
                        <div className={style.imageContainer}>
                            <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width={175} height={262.5} className={style.image} alt={`${movie.title}`} />
                        </div>
                        {selectedMovieId === movie.id && (
                            <div className={style.details}>
                                <div className={style.titleContainer}>
                                    <span className={style.title} title={movie.title}>{movie.title}</span>
                                </div>
                                <div className={style.summaryContainer}>
                                    <span className={style.summary}>{movie.overview}</span>
                                </div>
                                <div className={style.infoContainer}>
                                    <span className={style.stat}>Rating: {rating}</span>
                                    <span className={style.stat}>Released: {formattedReleaseDate}</span>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
