
import style from '../styles/searchBar.module.css'
import SearchIcon from '@mui/icons-material/Search';
// In your SearchBar.js file

import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchQuery);
        }
    };

    return (
        <div className={style.input_wrapper}>
            <SearchIcon id="search-icon" />
            <input
                type="text"
                className={style.input}
                placeholder='find movies'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
}
