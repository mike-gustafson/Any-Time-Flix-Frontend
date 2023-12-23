import React from 'react';
import '../styles/searchBar.module.css'
import SearchIcon from '@mui/icons-material/Search';export default function SearchBar({handleInput, SearchResult}){
    return(
        <div className='search-input mt-3 mb-5'>
            
            <SearchIcon id='search-icon'/>
            <input type= 'text' name="movie" className='w-50 p-2' placeholder='find movies' onChange={handleInput}
            onKeyDown={SearchResult}>
                
            </input>
            
        </div>
        
    )
}

