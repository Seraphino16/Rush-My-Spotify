import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function GetData({id}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/artists/` + id)
            .then(response => response.json())
            .then(json => {
                setData(json);
            console.log(json)
            } )
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='list-container'>
             {data ? <Artist artist={data}/> : 'Loading...'}
        </div>
    )
}


function Artist({artist}) {

    return (
        <div className='artist-info-container main'>            
            <img src={artist.photo} 
                alt={artist.name}
            />
            <ArtistInfo artist={artist}/>
        </div>
    )
}

function ArtistInfo({artist}) {
    return (
        <div className='info'>
            <h1>{artist.name}</h1>
            <p className='info-description'><strong>{artist.description}</strong></p>
            <br />
            <p>{artist.bio}</p>
        </div>
    )
}

function Header() {
    return (
        <div className='header main'>
            <h1>Artist</h1>
        </div>
    )
}

function ArtistDetails() {

    const { id } = useParams();

    return (
        <div className='Artist'>
            <Header />
            <GetData id={id}/>
        </div>
    )
}

export default ArtistDetails;