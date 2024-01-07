import Image from 'next/image';
import axios from 'axios';

export default function UserList({ list, listName, dataProp, onUpdateList }) {
  
  const handleRemoveFromListClick = async (event, movieId) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/removeFromList/${listName}/${dataProp._id}`, { movieId });
      if (response.status === 200) {
        // Call the callback function to update the list in the parent component
        onUpdateList(movieId);
      } else {
        console.log('Error removing movie, code:', response.status);
      }
    } catch (error) {
      console.error('Error removing movie from list', error);
    }
  }

  return (
    <div>
      {list.map(movie => (
        <div key={movie._id} style={{ display: 'flex', marginBottom: '20px', border: '1px solid #ccc', padding: '10px', width: '50%'}}>
          <div style={{ width: '60%', height: '100%', backgroundColor: 'red', marginRight: '20px' }}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              width={200}
              height={200}
              alt={`${movie.title}`}
            />
          </div>
          <div>
            <h3>{movie.original_title}</h3>
            <p>{movie.overview}</p>
            <h6 onClick={(event) => handleRemoveFromListClick(event, movie.id)}>Remove from {listName}</h6>
          </div>
        </div>
      ))}
    </div>
  )
}
