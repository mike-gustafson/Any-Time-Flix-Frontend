import Image from 'next/image';
import { useState, useEffect } from 'react';
import style from '../styles/results.module.css';

export default function Results() {
    const [data, setData] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movies/now-playing`)
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
            {data.results.map((movie) => (
                <div key={movie.id} className={selectedMovieId === movie.id ? style.expandedBox : style.box} onClick={() => handleMovieClick(movie.id)}>
                    <div className={style.body}>
                        <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width={200} height={300} className={style.image}/>
                        {selectedMovieId === movie.id && (
                            <div className={style.details}>
                                <p className={style.summary}>{movie.overview}
                                <p className={style.title}>{movie.title}</p>
                                <div className={style.info}>
                                    <p className={style.rating}>Average Rating: {movie.vote_average}</p>
                                    <p className={style.releaseDate}>Release Date: {movie.release_date}</p>
                                </div>
                                    </p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
