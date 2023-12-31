import React, { useState, useEffect, useMemo } from 'react';
import style from '../styles/MovieDetails.module.css';
import Results from './Results';
import Image from 'next/image';

export default function Movie({ movie, toggleFilter }) {
  const [fetchedMovie, setFetchedMovie] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movies/movie/${movie}`)
      .then((res) => res.json())
      .then((data) => {
        setFetchedMovie(data);
        console.log('Data fetched for', data.original_title);
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
        // Handle the error appropriately in your application
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

const fakeToggleFilter = () => {
    console.log('fakeTogglefilter called');
}

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

  return (
    <div className={style.container}>
      {fetchedMovie ? (
        <>
          {/* Movie header */}
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

          {/* Movie body */}
          <div className={style.body}>
            {/* Movie image and tagline */}
            <div className={style.image}>
              <Image src={`https://image.tmdb.org/t/p/w500${fetchedMovie.poster_path}`} width={400} height={300} alt={fetchedMovie.original_title} />
              <p className={style.tag}>{fetchedMovie.tagline}</p>
            </div>

            {/* Movie details */}
            <div className={style.description}>
              {/* Movie overview */}
              <p className={style.overview}>{fetchedMovie.overview}</p>

              {/* Genres */}
              <ul className={style.genres}>
                <li className={style.labelLi}>Genres</li>
                {fetchedMovie.genres.map((genre, index) => (
                  <li key={`genre_${genre.id}`} onClick={() => handleGenreClick(genre.name)}>
                    {index === 0 ? genre.name : `| ${genre.name}`}
                  </li>
                ))}
              </ul>

              {/* Languages */}
              <ul className={style.languages}>
                <li className={style.labelLi}>Languages</li>
                {fetchedMovie.spoken_languages.map((language, index) => (
                  <li key={`language_${language.iso_639_1}`}>
                    {index === 0 ? language.name : `| ${language.name}`}
                  </li>
                ))}
              </ul>

              {/* Production Companies */}
              <ul className={style.productionCompanies}>
                <li className={style.labelLi}>Production Companies</li>
                {fetchedMovie.production_companies.map((company, index) => (
                  <li key={`company_${company.id}`}>
                    {index === 0 ? company.name : `| ${company.name}`}
                  </li>
                ))}
              </ul>

              {/* Recommendations */}
              <div className={style.recommendations}>
                Recommendations
                <Results resultsLength={20} resultsRoute={`/movies/movie/${fetchedMovie.id}/recommendations`} toggleFilter={fakeToggleFilter} />
              </div>
            </div>

            {/* Credits */}
            <div className={style.credits}>
              <ul className={style.cast}>
                <li className={style.creditsLabel}>Cast</li>
                {Object.values(castCreditsMap).map((cast) => (
                  <li key={`cast_${cast.id}`} className={style.credit}>
                    {cast.name}
                    <span className={style.character}>{cast.characters.join(', ')}</span>
                  </li>
                ))}
              </ul>
              <ul className={style.crew}>
                <li className={style.creditsLabel}>Crew</li>
                {Object.values(crewCreditsMap).map((crew) => (
                  <li key={`crew_${crew.id}`} className={style.credit}>
                    {crew.name}
                    <span className={style.job}>{crew.jobs.join(', ')}</span>
                  </li>
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
