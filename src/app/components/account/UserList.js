import Image from 'next/image';
import axios from 'axios';
import style from '../../styles/UserList.module.css';
export default function UserList({ list, listName, dataProp, onUpdateList }) {
  
  const handleRemoveFromListClick = async (event, movie) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/removeFromList/${listName}/${dataProp.id}`, { movie });
      if (response.status === 200) {
        // Call the callback function to update the list in the parent component
        onUpdateList(movie);
      } else {
        console.log('Error removing movie, code:', response.status);
      }
    } catch (error) {
      console.error('Error removing movie from list', error);
    }
  }

  return (
    <div className={style.container}>
      {list.map(movie => (
        <div className={style.listItem} key={movie._id}>
          <div className={style.imageContainer}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              height={158}
              width={100}
              alt={`${movie.title}`}
            />
          </div>
          <div className={style.detailsContainer}>
            <div className={style.detailsHeader}>
              <h3 className={style.title}>{movie.original_title}</h3>
              <div className={`${style.removeButtonContainer} ${style.tooltip}`} onClick={(event) => handleRemoveFromListClick(event, movie)}>
                X
              </div>
            </div>
            <div className={style.detailsBody}>
              <p className={style.overview}>{movie.overview}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
