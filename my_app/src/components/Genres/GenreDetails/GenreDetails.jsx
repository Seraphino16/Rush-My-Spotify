import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function GenreDetails() {
  const { genreId } = useParams();
  const [genre, setGenre] = useState({});
  const [albums, setAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [albumsPerPage] = useState(10); // Limite d'albums par page

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {

        // Récuppérer les id des albums qui correspondent au genre
        const response = await fetch(`http://localhost:8000/genres/${genreId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails du genre');
        }
        const data = await response.json();
        setGenre(data.genre);
        const albumIds = data.albums;

        // Récupérer les données des albums de leur id
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

  // Calcul de la pagination
  const indexOfFirstAlbum = (currentPage - 1) * albumsPerPage;
  const indexOfLastAlbum = indexOfFirstAlbum + albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="main">
      <h1>Albums de genre : {genre.name}</h1>
      <div className="album-container">
        {currentAlbums.map(album => (
          <div key={album.id} className="album">
            <Link to={`/albums/${album.id}`}>
              <img src={album.cover} alt={album.name} />
              {album.name}
            </Link>
          </div>
        ))}
      </div>
      <div className='navigation'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Page précédente</button>
        <span> Page {currentPage}  </span>
        <button onClick={handleNextPage}>Page suivante</button>
      </div>
    </div>
  );
}

export default GenreDetails;


