import React, { useState, useEffect } from 'react';
import style from '../styles/Details.module.css'
import Results from './Results';



export default function MovieDetails() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movies/movie/11`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log('Movie details:', data); 
      })
      .catch((error) => console.error('Error fetching movie details:', error));
      
  }, []);

  

  
  const handleGenreClick = (genreName) => {
    // logic here
    console.log(`Navigate to ${genreName} movies`);
  };

  const popular = data ? data.popularity.toFixed(0) : null;


  return (
   
    <div>
      {data
      && 
      (

        
        <div className={style.container}>
        
        <h1 className={style.title}>
            {data.original_title}
            </h1>
            <p2 className={style.tag}>{data.tagline}</p2>
          <span className={style.popular}>Rating: {popular}/100%</span>
          <h2 className={style.date}>Release Date:{data.release_date}</h2>
          <h3 className={style.runtime}>Runtime:{data.runtime}</h3>
          
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            width={175} height={262.5}
            alt={data.original_title}
          />
          {data.genres && (
            <div className={style.box}>
             <ul>
              <strong className={style.label}>Genres:</strong>
                {data.genres.map((genre) => (
                  <li key={genre.id} onClick={() => handleGenreClick(genre.name)}>
                  {genre.name}
                </li>
                ))}
              </ul>
            </div>
          )}
            {data.spoken_languages && (
            <div className={style.box}>
              <strong className={style.label}>Spoken Languages:</strong>
              <ul>
                {data.spoken_languages.map((language) => (
                  <li key={language.iso_639_1}>{language.name}</li>
                ))}
              </ul>
            </div>
          )}

          {data.production_companies && (
            <div className={style.box}>
              <strong className={style.label}>Production Companies:</strong>
              <ul>
                {data.production_companies.map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ul>
            </div>
          )}
          <p className={style.overview}>{data.overview}</p>
          <Results
            resultsLength={8}
            resultsRoute={`/movies/movie/11/recommendations`}
          />
        </div>
      )}

      {!data && <p>Loading...</p>}
    </div>
  );
}



