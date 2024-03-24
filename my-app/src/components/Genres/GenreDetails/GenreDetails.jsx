import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function GenreDetails() {
  const { genreId } = useParams();
  const [genre, setGenre] = useState({});
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/genres/${genreId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails du genre');
        }
        const data = await response.json();
        setGenre(data.genre);
        const albumIds = data.albums;

        const albumsData = await Promise.all(albumIds.map(async (albumId) => {
          const albumResponse = await fetch(`http://localhost:8000/albums/${albumId}`);
          if (!albumResponse.ok) {
            throw new Error(`Erreur lors de la récupération de l'album avec l'ID ${albumId}`);
          }
          const albumData = await albumResponse.json();
          const albumName = albumData.album.name;
          const albumCover = albumData.album.cover;
          return { id: albumId, name: albumName, cover: albumCover };
        }));
        setAlbums(albumsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenreDetails();
  }, [genreId]);

  return (
    <div className="main">
      <h1>Albums de genre : {genre.name}</h1>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            <Link to={`/albums/${album.id}`}>
              <img src={album.cover} alt={album.name} />
              {album.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreDetails;

