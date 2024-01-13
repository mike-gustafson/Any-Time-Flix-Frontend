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
    // useStates
    const [search, setSearch] = useState('');

    // handles what happens when "enter" is pressed while in the search bar
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // performs search (passed back to page.js)
            handleSearch(search);
            // resets search bar
            setSearch('');
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