import Image from 'next/image';
import axios from 'axios';
import style from '../../styles/UserList.module.css';
import { useState, useEffect } from 'react';

export default function UserList({ list, listName, dataProp, onUpdateList }) {
  const [queryResults, setQueryResults] = useState({}); // State to store results for each query
  const [queryVisibility, setQueryVisibility] = useState({});

  const handleRemoveFromListClick = async (event, movie) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/removeFromList/${listName}/${dataProp.id}`, { movie });
      if (response.status === 200) {
        // Call the callback function to update the list in the parent component
        onUpdateList(movie);
      } else {
        console.log('Error removing movie, code:', response.status);
      }
    } catch (error) {
      console.error('Error removing movie from list', error);
    }
  }

  const fetchTop10Results = async (query) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/movies/search/${query}/1`);
      if (response.status === 200) {
        const top10Results = response.data.results.slice(0, 10);
        setQueryResults((prevResults) => ({
          ...prevResults,
          [query]: top10Results, // Store results for each query separately
        }));
      } else {
        console.log('Error fetching top 10 results, code:', response.status);
      }
    } catch (error) {
      console.error('Error fetching top 10 results', error);
    }
  }

  const toggleResultsVisibility = (query) => {
    console.log('toggling visibility for', query);
    setQueryVisibility((prevVisibility) => ({
      ...prevVisibility,
      [query]: !prevVisibility[query],
    }));
  }

  useEffect(() => {
    if (listName === 'recentSearches' && list.length > 0) {
      list.forEach((query) => {
        fetchTop10Results(query);
        setQueryVisibility((prevVisibility) => ({
          ...prevVisibility,
          [query]: false, // Initialize visibility for each query to false
        }));
      });
    }
  }, [listName, list]);

  return (
    <div className={`${style.container} ${listName === 'recentSearches' ? style.columnLayout : style.rowLayout}`}>
      {listName !== 'recentSearches' && list.map((movie) => (
        <div className={style.listItem} key={movie._id}>
          <div className={style.imageContainer}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              height={158}
              width={100}
              alt={`${movie.title}`}
            />
          </div>
          <div className={style.detailsContainer}>
            <div className={style.detailsHeader}>
              <h3 className={style.title}>{movie.original_title}</h3>
              <div className={`${style.removeButtonContainer} ${style.tooltip}`} onClick={(event) => handleRemoveFromListClick(event, movie)}>
                X
              </div>
            </div>
            <div className={style.detailsBody}>
              <p className={style.overview}>{movie.overview}</p>
            </div>
          </div>
        </div>
      ))}
      {listName === 'recentSearches' && list.map((query, index) => (
        <div className={style.recentSearchItem} key={index}>
          <div className={style.recentSearchContainer}>
            <h3 className={style.recentSearchTitle} onClick={() => toggleResultsVisibility(query)}>
              {query}
            </h3>
            <div className={`${style.recentSearchResults} ${queryVisibility[query] ? style.visible : style.hidden}`}>
              {queryResults[query]?.map((movie) => (
                <div className={style.recentSearchResult} key={movie.id}>
                  <div className={style.imageContainer}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      height={158}
                      width={100}
                      alt={`${movie.title}`}
                    />
                  </div>
                  <div className={style.recentSearchResultDetails}>
                    <h6 className={style.recentSearchResultTitle}>{movie.title}</h6>
                    <p className={style.recentSearchResultOverview}>{movie.overview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
