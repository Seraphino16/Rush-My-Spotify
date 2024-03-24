import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function AlbumDetails() {
    const [albumDetails, setAlbumDetails] = useState(null);
    const [artistDetails, setArtistDetails] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/albums/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des détails de l\'album');
                }
                const data = await response.json();
                setAlbumDetails(data);

                const artistResponse = await fetch(`http://localhost:8000/artists/${data.album.artist_id}`);
                if (!artistResponse.ok) {
                    throw new Error('Erreur lors de la récupération des détails de l\'artiste');
                }
                const artistData = await artistResponse.json();
                setArtistDetails(artistData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAlbumDetails();
    }, [id]);

    if (error) {
        return <p>Une erreur est survenue: {error}</p>;
    }

    if (!albumDetails || !artistDetails) {
        return <p>Chargement des détails...</p>;
    }

    return (
         <div className="album-card main">
            <div className="album-header">
                <img src={albumDetails.album.cover} alt="Cover" />
            </div>
            <div className="album-body">
                <div className="left-column">
                    <h2>{albumDetails.album.name}</h2>
                    <p>Artiste : <Link to={`/artists/${artistDetails.id}`}>{artistDetails.name}</Link></p>
                    <p>Date de sortie : {new Date(albumDetails.album.release_date * 1000).toLocaleDateString()}</p>
                    <p>Popularité : {albumDetails.album.popularity}</p>
                </div>
                <div className="right-column">
                    <h3>Description</h3>
                    <p>{albumDetails.album.description}</p>
                </div>
            </div>
        </div>
    );
}

export default AlbumDetails;
