
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [genres, setGenres] = useState([]);

  const apiUrl = 'http://localhost:8000/genres';

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(apiUrl);
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
    <div className="App">
      <h1>Liste des genres de musique</h1>
      <ul>
        {genres.map(genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

