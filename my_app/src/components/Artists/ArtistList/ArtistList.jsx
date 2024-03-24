
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
        <li key={artist.id}>
            {artist.name}
            <br />
            {artist.description}
            <br />
            <Link to={`/artists/${artist.id}`}>Show details</Link>
        </li>
    )

    return (        
        <ul>{listArtists}</ul>
    )
}

function GetData() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/artists')
            .then(response => response.json())
            .then(json => {
                setData(json);
            console.log(json)
            } )
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='list-container'>
             {data ? <List data={data}/> : 'Loading...'}
        </div>
    )
}

function ListArtist() {
    return (
        <div className='ListArtist main'>
            <Header/>
            <GetData />
        </div>        
    )
}

export default ListArtist;