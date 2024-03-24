import React, { useState, useEffect } from 'react';
import AlbumContainer from '../AlbumContainer';

// Fonction Header pour afficher l'en-tête de la page
function Header() {
    return (
        <div className='header-list main'>
            <h2 className='title-list'>Liste des Albums</h2>
        </div>
    );
}

// Fonction pour récupérer les données des albums depuis l'API
function GetData({ page, setPage, limit }) {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);

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
    }, [page, limit]);

    // return <List albums={albums} />;
    return (
        <>
        {error && <p>Nous rencontrons un problème avec la récupération des données</p>}
        <AlbumContainer albums={albums} />
        </>
    )
}

// Fonction pour afficher la liste des albums avec gestion de la pagination
function AlbumList() {
    const [page, setPage] = useState(1); // Page actuelle
    const [inputPage, setInputPage] = useState(1); // Page entrée par l'utilisateur
    const limit = 20; // Limite d'albums par page
    const totalPages = 82; // Nombre total de pages

    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleInputChange = (e) => {
        const pageNumber = parseInt(e.target.value);
        setInputPage(pageNumber); // Met à jour l'état de la page entrée par l'utilisateur
    };

    const handlePageBlur = () => {
        const pageNumber = parseInt(inputPage);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber); // Change la page si le numéro entré est valide
        } else {
            // Gérer les erreurs de saisie de l'utilisateur (par exemple, afficher un message d'erreur)
            console.error("Numéro de page invalide");
        }
    };

    return (
        <div>
            <Header />
            <div className='main'>
            <GetData page={page} setPage={setPage} limit={limit} />
            </div>
            <div className='navigation main'>
                <button onClick={handlePrevPage} disabled={page === 1}>&#9664;</button>
                <span> Page <input type="number" value={inputPage} onChange={handleInputChange} onBlur={handlePageBlur} /> sur {totalPages} </span>
                <button onClick={handleNextPage} disabled={page === totalPages}>&#9654;</button>
            </div>
        </div>
    );
}

export default AlbumList;