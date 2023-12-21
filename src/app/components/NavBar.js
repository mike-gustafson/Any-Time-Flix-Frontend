import SearchBar from "./SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';

export default function NavBar(){
    return(
        <div className='w-100 main wrapper d-flex flex-column align-items-center 
        justify-contect-center'>
            <header className='w-100 text-center text-white'>
                <h2>Movie Search</h2>
                <SearchBar/>
            </header>

        </div>
    )
}