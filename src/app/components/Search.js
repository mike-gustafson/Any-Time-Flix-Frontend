import React, { useState } from 'react';
import style from '../styles/Search.module.css';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ handleSearch }) {
    const [search, setSearch] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch(search);
        }
    };

    return (
        <div className={style.container}>
            <SearchIcon className={style.icon} />
            <input
                type="text"
                name="movie"
                className={style.input}
                placeholder="find movies"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}