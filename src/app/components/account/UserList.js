import Image from 'next/image';


export default function UserList({list}) {
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
          </div>
        </div>
      ))}
    </div>
    )
}