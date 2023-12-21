'use client';
import 'bulma/css/bulma.min.css';
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import setAuthToken from './utils/setAuthToken';
import Results from './components/Results';

// we are going to be fetching data from our API and displaying it on
// the page

export default function Home() {
  // state is what the data is representing in realtime
  const [age, setAge] = useState(null);
  const [name, setName] = useState('Dylan');


  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Any Time Flix</h1>
      <Results />
    </main>
  );
}
