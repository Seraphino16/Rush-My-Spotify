import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AlbumContainer from '../../Album/AlbumContainer';

function GetData({id}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/artists/${id}`)
            .then(response => response.json())
            .then(json => {
                setData(json);
            } )
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div className='list-container'>
             {data ? <Artist artist={data}/> : 'Loading...'}
        </div>
    )
}


function Artist({artist}) {

    return (
        <div className='artist-info-container'>
            <div className='img-container'>          
                <img src={artist.photo} 
                    alt={artist.name}
                />
            </div>
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

function GetAlbums({id}) {

    const [albums, setAlbums] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/albums/artist/${id}`)
            .then(response => response.json())
            .then(json => {
                setAlbums(json);
            } )
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div className='albums-container'>
            <h1>Albums</h1>
            <hr />
             {albums ? <AlbumContainer albums={albums}/> : 'Loading...'}
        </div>
    )
}

function Content() {

    const { id } = useParams();

    return (
        <div className='Artist main'>
            <GetData id={id} />
            <GetAlbums id={id} />
        </div>
    )
}

export default Content;