import React from 'react';
import '../styles/searchBar.module.css'
import SearchIcon from '@mui/icons-material/Search';
// In your SearchBar.js file

<<<<<<< HEAD
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
=======
export default function SearchBar({handleInput, SearchResult}){
    return(
        <div className='search-input mt-3 mb-5'>
            
            <SearchIcon id='search-icon'/>
            <input type= 'text' name="movie" className='w-50 p-2' placeholder='find movies' onChange={handleInput}
            onKeyDown={SearchResult}>
                
            </input>
            
        </div>
        
    )
}
>>>>>>> c9efbe7268993d103243893db47758411194fa1f
