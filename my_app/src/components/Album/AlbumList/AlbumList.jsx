import React, { useState, useEffect } from 'react';
import { Link} from "react-router-dom";

function AlbumList() {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Page actuelle
    const limit = 20; // Limite d'albums par page

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(`http://localhost:8000/albums?page=${page}&limit=${limit}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();
                setAlbums(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAlbums();
    }, [page]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className='main'>
            <h2>Liste des Albums</h2>
            {error && <p>Une erreur est survenue: {error}</p>}
            <ul>
                {albums.map(album => (
                    <li key={album.id}>
                        
                        <Link to={`/albums/${album.id}`}>{album.name}</Link>
                    </li>
                ))}
            </ul>
            <div className='navigation'>
                <button onClick={handlePrevPage} disabled={page === 1}>Page précédente</button>
                <span> Page {page} sur 82 </span>
                <button onClick={handleNextPage}>Page suivante</button>
            </div>
        </div>
    );
}

export default AlbumList;