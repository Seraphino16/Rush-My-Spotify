import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Fonction pour afficher l'en-tête avec la couverture de l'album
function AlbumHeader({ cover }) {
    return (
        <div className="album-header">
            <img src={cover} alt="Cover" />
        </div>
    );
}

// Fonction pour afficher la description de l'album
function AlbumDescription({ albumDetails }) {
    return (
        <div>
            <h3>Description</h3>
            <p className='description'>{albumDetails.album.description}</p>
        </div>
    );
}

// Fonction pour afficher les informations de base de l'album
function AlbumInfo({ albumDetails }) {
    return (
        <div>
            <h2>{albumDetails.album.name}</h2>
            <p>Date de sortie : {new Date(albumDetails.album.release_date * 1000).toLocaleDateString()}</p>
            <p>Popularité : {albumDetails.album.popularity}</p>
        </div>
    );
}

// Fonction pour afficher la liste des pistes de l'album
function AlbumTrackList({ currentTrackName, currentTrack, isPlaying, togglePlay, playPreviousTrack, playNextTrack, albumDetails }) {
    return (
        <div>
            <h1 className='title-track'>Lecteur audio</h1>
            <h4>{currentTrackName}</h4>
            <audio
                controls
                src={currentTrack.mp3}
                type="audio/mpeg"
                autoPlay={isPlaying}
                onPlay={togglePlay}
                onPause={togglePlay}
            />
            <div className="navigation">
                <button onClick={playPreviousTrack} disabled={currentTrack.index === 0}>&#9664;</button>
                <button onClick={playNextTrack} disabled={currentTrack.index === albumDetails.tracks.length - 1}>&#9654;</button>
            </div>
        </div>
    );
}

// Fonction pour récupérer les détails de l'album depuis l'API
function useAlbumDetails(id) {
    const [albumDetails, setAlbumDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/albums/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des détails de l\'album');
                }
                const data = await response.json();
                setAlbumDetails(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchAlbumDetails();
    }, [id]);

    return { albumDetails, error };
}

// Fonction pour afficher les détails de l'album dans une mise en page structurée
function AlbumDetailsDisplay({ albumDetails, currentTrackName, currentTrack, isPlaying, togglePlay, playPreviousTrack, playNextTrack }) {
    if (!albumDetails) {
        return <p>Chargement des détails de l'album...</p>;
    }

    return (
        <div className="album-details-container">
            <div className="album-grid">
                <div className="album-cover">
                    <AlbumHeader cover={albumDetails.album.cover} />
                </div>
                <div className="album-info">
                    <AlbumInfo albumDetails={albumDetails} />
                    <AlbumDescription albumDetails={albumDetails} />
                </div>
            </div>
            <div className="audio-player">
                <AlbumTrackList
                    currentTrackName={currentTrackName}
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    togglePlay={togglePlay}
                    playPreviousTrack={playPreviousTrack}
                    playNextTrack={playNextTrack}
                    albumDetails={albumDetails}
                />
            </div>
        </div>
    );
}

// Fonction qui combine les deux parties pour afficher les détails de l'album
function AlbumDetails() {
    const { id } = useParams();
    const { albumDetails, error } = useAlbumDetails(id);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackName, setCurrentTrackName] = useState('');

    const playPreviousTrack = () => {
        setCurrentTrackIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const playNextTrack = () => {
        setCurrentTrackIndex(prevIndex => Math.min(prevIndex + 1, albumDetails.tracks.length - 1));
    };

    const togglePlay = () => {
        setIsPlaying(prevIsPlaying => !prevIsPlaying);
    };

    useEffect(() => {
        if (albumDetails && albumDetails.tracks && albumDetails.tracks[currentTrackIndex]) {
            setCurrentTrackName(albumDetails.tracks[currentTrackIndex].name);
        }
    }, [albumDetails, currentTrackIndex]);

    if (error) {
        return <p>Une erreur est survenue: {error}</p>;
    }

    return (
        <AlbumDetailsDisplay
            albumDetails={albumDetails}
            currentTrackName={currentTrackName}
            currentTrack={albumDetails ? albumDetails.tracks[currentTrackIndex] : null}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            playPreviousTrack={playPreviousTrack}
            playNextTrack={playNextTrack}
        />
    );
}

export default AlbumDetails;