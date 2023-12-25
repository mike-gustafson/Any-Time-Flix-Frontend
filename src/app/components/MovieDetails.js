import React, { useState, useEffect } from 'react';
import style from '../styles/MovieDetails.module.css';
import Results from './Results';
import Image from 'next/image';
import MovieDetailsDataBox from './explore/MovieDetailsDataBox';

export default function Movie({ movie }) {
  const [fetchedMovie, setFetchedMovie] = useState(null);

  useEffect(() => {
    // Fetch additional movie data
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movies/movie/${movie}`)
      .then((res) => res.json())
      .then((data) => {
        setFetchedMovie(data);
        console.log(data, 'data');
      });
  }, []);

  const handleGenreClick = (genreName) => {
    // Logic for handling genre click
    console.log(`Navigate to ${genreName} movies`);
  };

  // Create a mapping of crew and cast names to their combined characters or jobs
  const crewCreditsMap = {};
  const castCreditsMap = {};

  if (fetchedMovie) {
    // Iterate through crew credits
    fetchedMovie.credits.crew.forEach((crew) => {
      const { id, name, job } = crew;
      if (!crewCreditsMap[id]) {
        crewCreditsMap[id] = { name, jobs: [] };
      }
      crewCreditsMap[id].jobs.push(job);
    });
  
    // Iterate through cast credits
    fetchedMovie.credits.cast.forEach((cast) => {
      const { id, name, character } = cast;
      if (!castCreditsMap[id]) {
        castCreditsMap[id] = { name, characters: [] };
      }
      castCreditsMap[id].characters.push(character);
    });
  }

  // Generate unique alphanumeric IDs for cast and crew members with undefined or fake IDs
  let nextFakeId = 1;
  Object.values(castCreditsMap).forEach((cast) => {
    if (!cast.id) {
      cast.id = `fakeid${nextFakeId.toString().padStart(8, '0')}`;
      nextFakeId++;
    }
  });

  Object.values(crewCreditsMap).forEach((crew) => {
    if (!crew.id) {
      crew.id = `fakeid${nextFakeId.toString().padStart(8, '0')}`;
      nextFakeId++;
    }
  });

  return (
    <div className={style.container}>
      {fetchedMovie && (
        <>
          <div className={style.header}>
            <div className={style.title}>
              {fetchedMovie.original_title}
              <div className={style.date}>
                ({(new Date(fetchedMovie.release_date)).getFullYear()}) - {fetchedMovie.runtime}min
              </div>
            </div>

            <div className={style.voteDetails}>
              <div className={style.popular}>Vote Avg: {fetchedMovie.vote_average.toFixed(1)}/10</div>
            </div>
          </div>

          <div className={style.body}>
            <div className={style.image}>
              <Image src={`https://image.tmdb.org/t/p/w500${fetchedMovie.poster_path}`} width={400} height={300} alt={fetchedMovie.original_title} />
              <p className={style.tag}>{fetchedMovie.tagline}</p>
            </div>
            <div className={style.description}>
              <p className={style.overview}>{fetchedMovie.overview}</p>
              <ul className={style.genres}>
                <li className={style.labelLi}>Genres</li>
                {fetchedMovie.genres.map((genre, index) => (
                  <li key={`genre_${genre.id}`} onClick={() => handleGenreClick(genre.name)}> {index === 0 ? genre.name : `|${genre.name}`}</li>
                ))}
              </ul>
              <ul className={style.languages}>
                <li className={style.labelLi}>Languages</li>
                {fetchedMovie.spoken_languages.map((language, index) => (
                  <li key={`language_${language.iso_639_1}`}> {index === 0 ? language.name : `|${language.name}`}</li>
                ))}
              </ul>
              <ul className={style.productionCompanies}>
                <li className={style.labelLi}>Production Companies</li>
                {fetchedMovie.production_companies.map((company, index) => (
                  <li key={`company_${company.id}`}> {index === 0 ? company.name : `|${company.name}`}</li>
                ))}
              </ul>
              <div className={style.recommendations}>
                Recommendations
                <Results resultsLength={20} resultsRoute={`/movies/movie/${fetchedMovie.id}/recommendations`} />
              </div>
            </div>
            <div className={style.credits}>
              <ul className={style.cast}>
                <li className={style.creditsLabel}>Cast</li>
                {Object.values(castCreditsMap).map((cast) => (
                  <li key={`cast_${cast.id}`} className={style.credit}>
                    {cast.id === `fakeid00000001` ? 'Unknown Actor' : cast.name}
                    <span className={style.character}>{cast.characters.join(', ')}</span>
                  </li>
                ))}
                <li className={style.creditsLabel}>Crew</li>
                {Object.values(crewCreditsMap).map((crew) => (
                  <li key={`crew_${crew.id}`} className={style.credit}>
                    {crew.id === `fakeid00000001` ? 'Unknown Crew' : crew.name}
                    <span className={style.character}>{crew.jobs.join(', ')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      {!fetchedMovie && <p>Loading...</p>}
    </div>
  );
}
