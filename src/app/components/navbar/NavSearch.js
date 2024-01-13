// use client for useStates
'use client'

// imports
import React, { useState } from 'react';

// style import
import styles from './NavSearch.module.css';

// material-ui icon
import SearchIcon from '@mui/icons-material/Search';

// component
export default function Search({ handleSearch }) {
    
    const [search, setSearch] = useState(''); // used to store search bar input

    // handles what happens when "enter" is pressed while in the search bar
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // prevent page refresh
            handleSearch(search); // pass search bar input back to page.js
            setSearch(''); // reset search bar
        }
    };

    // return component 
    return (
        <div className={styles.container}>
            <SearchIcon className={styles.icon} />
            <input
                type="text"
                name="search"
                className={styles.input}
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}