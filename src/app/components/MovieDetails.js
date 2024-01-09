import React, { useState, useEffect, useMemo } from 'react';
import style from '../styles/MovieDetails.module.css';
import Results from './Results';
import Image from 'next/image';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function MovieDetails({ movie, toggleFilter, userData }) {
  const [fetchedMovie, setFetchedMovie] = useState(null);
  const [isRecommendationsExpanded, setIsRecommendationsExpanded] = useState(false);

  const fakeToggleFilter = () => { }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movies/movie/${movie}`)
      .then((res) => res.json())
      .then((data) => {
        setFetchedMovie(data);
        console.log('Data fetched for', data.original_title);
        console.log('Data:', data)
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

  const castCreditsMap = useMemo(() => createCreditMap(fetchedMovie?.credits?.cast || []), [fetchedMovie]);
  const crewCreditsMap = useMemo(() => createCreditMap(fetchedMovie?.credits?.crew || []), [fetchedMovie]);

  let nextFakeId = 1;
  const assignFakeId = (creditMap) => {
    Object.values(creditMap).forEach((credit) => {
      if (!credit.id) {
        credit.id = `fakeid${nextFakeId.toString().padStart(8, '0')}`;
        nextFakeId++;
      }
    });
  };

  if (castCreditsMap) {
    assignFakeId(castCreditsMap);
  }

  if (crewCreditsMap) {
    assignFakeId(crewCreditsMap);
  }

  const toggleRecommendations = () => {
    setIsRecommendationsExpanded(!isRecommendationsExpanded);
  };

  const openProviderLink = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className={style.container}>
      {fetchedMovie ? (
        <>
          <div className={style.header}>
            <div className={style.title}>
              {fetchedMovie.title}
              <div className={style.date}>
                {fetchedMovie.release_date && (
                  `(${(new Date(fetchedMovie.release_date)).getFullYear()}) - ${fetchedMovie.runtime}min`
                )}
              </div>
            </div>

            <div className={style.voteDetails}>
              <div className={style.popular}>Average Rating  {fetchedMovie.vote_average ? fetchedMovie.vote_average.toFixed(1) : 'N/A'}/10</div>
            </div>
          </div>

          <div className={style.body}>
            <div className={style.imagePanel}>
              <div className={style.image}>
                <Image src={`https://image.tmdb.org/t/p/w500${fetchedMovie.poster_path}`} fill={true} alt={fetchedMovie.original_title} />
              </div>
              <div className={style.tagline}>
                {fetchedMovie.tagline && (
                  <p className={style.tag}>{fetchedMovie.tagline}</p>
                )}
              </div>
            </div>

            <div className={style.description}>
              <p className={style.overview}>{fetchedMovie.overview}</p>

              <ul className={style.genres}>
                <li className={style.labelLi}>Genres</li>
                {fetchedMovie.genres && fetchedMovie.genres.map((genre, index) => (
                  <li key={`genre_${genre.id}`}>{genre.name}</li>
                ))}
              </ul>

              <ul className={style.languages}>
                <li className={style.labelLi}>Languages</li>
                {fetchedMovie.spoken_languages && fetchedMovie.spoken_languages.map((language, index) => (
                  <li key={`language_${language.iso_639_1}`}>{language.name}</li>
                ))}
              </ul>

              <ul className={style.productionCompanies}>
                <li className={style.labelLi}>Production Companies</li>
                {fetchedMovie.production_companies && fetchedMovie.production_companies.map((company, index) => (
                  <li key={`company_${company.id}`}>{company.name}</li>
                ))}
              </ul>

              <div className={style.whereToWatchContainer}>
                {fetchedMovie.watch_providers && (
                  <>
                    {fetchedMovie.watch_providers.flatrate && (
                      <>
                        {fetchedMovie.watch_providers.flatrate.length > 0 && (
                          <>
                            <h3 className={style.whereToWatchTitle}>Streaming On</h3>
                            <div className={style.whereToWatch}>
                              {fetchedMovie.watch_providers.flatrate.map((provider, index) => (
                                <div
                                  className={style.provider}
                                  key={`provider_flatrate_${provider.provider_id}`}
                                  onClick={() => openProviderLink(provider.link)}
                                >
                                  <div className={style.providerLogo}>
                                    <Image src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} width={25} height={25} alt={provider.provider_name} />
                                    <span>{provider.provider_name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {fetchedMovie.watch_providers.rent && (
                      <>
                        {fetchedMovie.watch_providers.rent.length > 0 && (
                          <>
                            <h3 className={style.whereToWatchTitle}>Rent</h3>
                            <div className={style.whereToWatch}>
                              {fetchedMovie.watch_providers.rent.map((provider, index) => (
                                <div
                                  className={style.provider}
                                  key={`provider_rent_${provider.provider_id}`}
                                  onClick={() => openProviderLink(provider.link)}
                                >
                                  <div className={style.providerLogo}>
                                    <Image src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} width={25} height={25} alt={provider.provider_name} />
                                    <span>{provider.provider_name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {fetchedMovie.watch_providers.buy && (
                      <>
                        {fetchedMovie.watch_providers.buy.length > 0 && (
                          <>
                            <h3 className={style.whereToWatchTitle}>Buy</h3>
                            <div className={style.whereToWatch}>
                              {fetchedMovie.watch_providers.buy.map((provider, index) => (
                                <div
                                  className={style.provider}
                                  key={`provider_buy_${provider.provider_id}`}
                                  onClick={() => openProviderLink(provider.link)}
                                >
                                  <div className={style.providerLogo}>
                                    <Image src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`} width={25} height={25} alt={provider.provider_name} />
                                    <span>{provider.provider_name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}

                    <h3 className={style.whereToWatchAttribution}>
                      Available platforms provided by{" "}
                      <a href="https://www.justwatch.com" target="_blank" rel="noopener noreferrer">
                        <img
                          className={style.justWatchLogo}
                          src="https://www.themoviedb.org/assets/2/v4/logos/justwatch-c2e58adf5809b6871db650fb74b43db2b8f3637fe3709262572553fa056d8d0a.svg"
                          alt="JustWatch Logo"
                        />
                      </a>
                    </h3>
                  </>
                )}
              </div>

              <div className={style.recommendationsTrigger}>
                <h3>
                  Recommendations
                  <span className={style.recommendationsIconContainer}>
                    <KeyboardArrowUpIcon
                      className={isRecommendationsExpanded ? style.iconRotated : style.iconNotRotated}
                      onClick={toggleRecommendations}
                    />
                  </span>
                </h3>
              </div>

              <div className={isRecommendationsExpanded ? style.recommendationsExpanded : style.recommendationsCollapsed}>
                <div className={style.recommendationsTriggerInner}>
                  <h3>
                    Recommendations
                    <span className={style.recommendationsIconContainer}>
                      <KeyboardArrowUpIcon
                        className={isRecommendationsExpanded ? style.iconRotated : style.iconNotRotated}
                        onClick={toggleRecommendations}
                      />
                    </span>
                  </h3>
                </div>
                <div className={style.resultsContainer}>
                  <Results
                    resultsLength={20}
                    resultsRoute={fetchedMovie.id ? `/movies/movie/${fetchedMovie.id}/recommendations/` : '/movies'} // Update the route when fetchedMovie.id is missing
                    toggleFilter={fakeToggleFilter}
                    userData={userData}
                  />
                </div>
              </div>
            </div>

            <div className={style.creditsContainer}>
              <ul className={style.creditsList}>
                <li className={style.creditsLabel}>Cast</li>
                {castCreditsMap && Object.values(castCreditsMap).map((cast) => (
                  <li key={`cast_${cast.id}`}>
                    <div className={style.credit}>
                      <div className={style.creditName}>{cast.name}</div>
                      <div className={style.creditJob}>{cast.characters.join(', ')}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <ul className={style.creditsList}>
                <li className={style.creditsLabel}>Crew</li>
                {crewCreditsMap && Object.values(crewCreditsMap).map((crew) => (
                  <li key={`crew_${crew.id}`}>
                    <div className={style.credit}>
                      <div className={style.creditName}>{crew.name}</div>
                      <div className={style.creditJob}>{crew.jobs.join(', ')}</div>
                    </div>
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
