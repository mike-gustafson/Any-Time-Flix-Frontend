import React, { useState, useEffect, useMemo } from 'react';
import style from '../styles/MovieDetails.module.css';
import Results from './Results';
import Image from 'next/image';

export default function MovieDetails({ movie, toggleFilter }) {
  const [fetchedMovie, setFetchedMovie] = useState(null);
  const [isRecommendationsExpanded, setIsRecommendationsExpanded] = useState(false);

  const fakeToggleFilter = () => {}

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movies/movie/${movie}`)
      .then((res) => res.json())
      .then((data) => {
        setFetchedMovie(data);
        console.log('Data fetched for', data.original_title);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, [movie]);

  const createCreditMap = (credits) => {
    const creditMap = {};
    credits.forEach((credit) => {
      const { id, name, job, character } = credit;
      if (!creditMap[id]) {
        creditMap[id] = { name, jobs: [], characters: [] };
      }
      if (job) {
        creditMap[id].jobs.push(job);
      }
      if (character) {
        creditMap[id].characters.push(character);
      }
    });
    return creditMap;
  };

  const castCreditsMap = useMemo(() => createCreditMap(fetchedMovie?.credits.cast || []), [fetchedMovie]);
  const crewCreditsMap = useMemo(() => createCreditMap(fetchedMovie?.credits.crew || []), [fetchedMovie]);

  let nextFakeId = 1;
  const assignFakeId = (creditMap) => {
    Object.values(creditMap).forEach((credit) => {
      if (!credit.id) {
        credit.id = `fakeid${nextFakeId.toString().padStart(8, '0')}`;
        nextFakeId++;
      }
    });
  };

  assignFakeId(castCreditsMap);
  assignFakeId(crewCreditsMap);

  const toggleRecommendations = () => {
    setIsRecommendationsExpanded(!isRecommendationsExpanded);
  };

  return (
    <div className={style.container}>
      {fetchedMovie ? (
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
                  <li key={`genre_${genre.id}`}>{genre.name}</li>
                ))}
              </ul>

              <ul className={style.languages}>
                <li className={style.labelLi}>Languages</li>
                {fetchedMovie.spoken_languages.map((language, index) => (
                  <li key={`language_${language.iso_639_1}`}>{language.name}</li>
                ))}
              </ul>

              <ul className={style.productionCompanies}>
                <li className={style.labelLi}>Production Companies</li>
                {fetchedMovie.production_companies.map((company, index) => (
                  <li key={`company_${company.id}`}>{company.name}</li>
                ))}
              </ul>

              <div 
              className={style.recommendationsTrigger} 
              onClick={toggleRecommendations}
            >
              <h3>Recommendations (click to expand)</h3>
            </div>

            <div className={isRecommendationsExpanded ? style.recommendationsExpanded : style.recommendationsCollapsed}>
            <div 
              className={style.recommendationsTriggerInner} 
              onClick={toggleRecommendations}
            >
              <h3>Recommendations</h3>
            </div>
                         <Results 
                resultsLength={20} 
                resultsRoute={`/movies/movie/${fetchedMovie.id}/recommendations`} 
                toggleFilter={fakeToggleFilter} 
              />

            </div>
            </div>

            <div className={style.credits}>
              <ul className={style.cast}>
                <li className={style.creditsLabel}>Cast</li>
                {Object.values(castCreditsMap).map((cast) => (
                  <li key={`cast_${cast.id}`}>{cast.name}</li>
                ))}
              </ul>

              <ul className={style.crew}>
                <li className={style.creditsLabel}>Crew</li>
                {Object.values(crewCreditsMap).map((crew) => (
                  <li key={`crew_${crew.id}`}>{crew.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
