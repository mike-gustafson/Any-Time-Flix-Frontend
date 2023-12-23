'use client'
import 'bulma/css/bulma.min.css'; // What is this CSS file? Where is it used?
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import setAuthToken from './utils/setAuthToken';
import Results from './components/Results';
import NavBar from './components/NavBar';

export default function Home() {

  let movieId = 11;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsKey, setResultsKey] = useState(1);

    
  const handleSearch = (query) => {
    setSearchQuery(query);
    setResultsKey(resultsKey + 1);
  };

  function renderResultsSection(title, length, route) {
    return (
      <>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <Results resultsLength={length} resultsRoute={route} />
        <hr />
      </>
    );
  }

  return (
    <main className={styles.main}>
      <NavBar handleSearch={handleSearch} />
      <h1 className={styles.title}>Welcome to Any Time Flix</h1>
      <hr /> 
      <h3 className={styles.sectionTitle}>Search results for &apos;{searchQuery}&apos;</h3>
      <Results key={resultsKey} resultsLength={20} resultsRoute={`/movies/search/${searchQuery}`}/>
      <hr /> 
      {renderResultsSection('Popular', 14, '/movies/popular')}
      {renderResultsSection('Now Playing', 14, '/movies/now-playing')}
      {renderResultsSection('Recommendations based on Star Wars', 15, `/movies/movie/${movieId}/recommendations`)}
    </main>
  );
}
