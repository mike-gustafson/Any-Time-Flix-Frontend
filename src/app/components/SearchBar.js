
import style from '../styles/searchBar.module.css'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(){
    return(
        <div className={style.input_wrapper}>
            <SearchIcon id="search-icon"/>
            <input type= "text" className={style.input} placeholder='find movies'/>
        </div>
    )
}