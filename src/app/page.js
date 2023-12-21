'use client';
import 'bulma/css/bulma.min.css';
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import setAuthToken from './utils/setAuthToken';
import Results from './components/Results';
import NavBar from './components/NavBar';
// we are going to be fetching data from our API and displaying it on
// the page

export default function Home() {
  // state is what the data is representing in realtime
  const [age, setAge] = useState(null);
  const [name, setName] = useState('Dylan');

let movieId = 11;
let searchQuery = 'hacker';

  return (
    <main className={styles.main}>
      <NavBar/>
      <h1 className={styles.title}>Welcome to Any Time Flix</h1>
      <h3 className={styles.sectionTitle}>Popular</h3>
      <Results resultsLength={14} resultsRoute={`/movies/popular`}/>
      <hr />
      <h3 className={styles.sectionTitle}>Now Playing</h3>
      <Results resultsLength={14} resultsRoute={`/movies/now-playing`}/>
      <hr />
      <h3 className={styles.sectionTitle}>Recommendations based on Star Wars</h3>
      <Results resultsLength={15} resultsRoute={`/movies/movie/${movieId}/recommendations`}/>
      <hr /> 
      <h3 className={styles.sectionTitle}>Search results for 'Hacker'</h3>
      <Results resultsLength={20} resultsRoute={`/movies/search/${searchQuery}`}/>
      
    </main>
  );
}
