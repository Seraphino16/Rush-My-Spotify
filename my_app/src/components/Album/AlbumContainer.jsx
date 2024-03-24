import { Link } from 'react-router-dom';

function AlbumContainer({albums}) {

    const list = albums.map(album => (
      <div key={album.id} className="album">
        <Link to={`/albums/${album.id}`}>
          <img src={album.cover} alt={album.name} />
          {album.name}
      </Link>
      </div>
    ))
  
    return (
      <div className='album-container'>
        {list}
      </div>
    )
  }

export default AlbumContainer;