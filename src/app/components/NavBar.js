import SearchBar from "./SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
<<<<<<< HEAD

export default function NavBar({onSearch}){

=======
import '../styles/navBar.module.css'
export default function NavBar(){
    const [state, setState] = useState({
        search:'',
        results: []
    });
    const handleInput = (event) =>{
        let search = event.target.value;
        setState((prevState)=>{
            return{...prevState, search: search}
        })
    }
    const SearchResult =(event) => {
        if(event.key === "Enter"){
            alert("enter")
        }
    }
>>>>>>> c9efbe7268993d103243893db47758411194fa1f
    return(
        <div className='w-100 main-wrapper d-flex flex-column align-items-center 
        justify-contect-center'>
            <header className='w-100 text-center text-blue'>
                <h2>Movie Search</h2>
<<<<<<< HEAD
                <SearchBar onSearch={onSearch} />
=======
                <SearchBar handleInput={handleInput} SearchResult={SearchResult}/>
>>>>>>> c9efbe7268993d103243893db47758411194fa1f
            </header>

        </div>
    )
}