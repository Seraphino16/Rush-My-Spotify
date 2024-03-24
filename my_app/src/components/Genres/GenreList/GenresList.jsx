import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GenresList.css'

function GenresList() {
    const [genres, setGenres] = useState([]);
  
    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const response = await fetch('http://localhost:8000/genres');
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des genres');
          }
          const data = await response.json();
          setGenres(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchGenres(); 
    }, []);
  
    return (
      <div className="main">
        <h1>Quel genre de musique voulez-vous écouter ? </h1>
        <ul>
            {genres.map(genre => (
            <li key={genre.id}>
                <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
            </li>
        ))}
        </ul>
      </div>
    );
  }
  
  export default GenresList;