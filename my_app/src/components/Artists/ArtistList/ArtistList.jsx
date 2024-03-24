import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className='header'>
            <h1>Artists List</h1>
        </div>
    )
}

function List({data})
{
    const listArtists = data.map(artist =>
        
        <li key={artist.id} className='artist-item'>
            <Link to={`/artists/${artist.id}`} style={{textDecoration: 'none'}}>
                <div className='artist-card'>
                    
                    <div className='img-container'>
                        <img src={artist.photo} alt={artist.name} />
                    </div>
                    <h3>{artist.name}</h3>
                </div>
            </Link>
        </li>
        
    )

    return (        
        <ul className='list-columns'>{listArtists}</ul>
    )
}

function GetData({ page, limit }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/artists?page=${page}&limit=${limit}`)
            .then(response => response.json())
            .then(json => {
                setData(json);
                console.log(json)
            })
            .catch(error => console.error(error));
    }, [page, limit]);

    return (
        <div className='list-container'>
            {data ? <List data={data} /> : 'Loading...'}
        </div>
    )
}

function ListArtist() {
    
    const [page, setPage] = useState(1);
    const [inputPage, setInputPage] = useState(1);
    const limit = 20;
    const totalPages = 82;
    const nextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const inputChange = (e) => {
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
        <div className='ListArtist main'>
            <Header />
            <GetData page={page} limit={limit} />
            <div className='navigation main'>
                <button onClick={prevPage} disabled={page === 1}>&#9664;</button>
                <span> Page <input type="number" value={inputPage} onChange={inputChange} onBlur={handlePageBlur} /> </span>
                <button onClick={nextPage} disabled={page === totalPages}>&#9654;</button>
            </div>
        </div>
    )
}

export default ListArtist;