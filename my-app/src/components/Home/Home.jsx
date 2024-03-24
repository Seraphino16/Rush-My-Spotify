import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

    const [randomAlbums, setRandomAlbums] = useState([]);

    const fetchRandomsAlbums = async () => {
        try {
            const response = await fetch('http://localhost:8000/albums');

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des albums');
            }

            const data = await response.json();

            const suffledData = shuffleArray(data);

            const randomSelection = suffledData.slice(0, 24);
            setRandomAlbums(randomSelection);
        } catch (error) {
            console.log('Erreur : ', error);
        }
    };

    const shuffleArray = array => {
        const shuffledArray = [...array];
        shuffledArray.forEach((_, index) => {
          const randomIndex = Math.floor(Math.random() * (index + 1));
          [shuffledArray[index], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[index]];
        });
        return shuffledArray;
      };
      

    useEffect(() => {
        fetchRandomsAlbums();
    }, []);

    


    return (
        <div className="main">
          <h1>Bienvenue sur Spotify</h1>
          <h2>Que voulez-vous écouter ? </h2>
          <div className="album-container">

            {randomAlbums.map(album => (
              <div key={album.id} className="album">
                <Link to={`/albums/${album.id}`}>
                  <img src={album.cover} alt={album.name} />
                  {album.name}
              </Link>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Home;