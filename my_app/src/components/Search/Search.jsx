import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedFilters, setCheckedFilters] = useState({
    album: false,
    artist: false,
    genre: false
  });

  const [searchResults, setSearchResults] = useState([]);

  // Fonction pour détecter les lettres rentrées dans l'input
  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.length > 0) {
      handleSearch(newSearchTerm);
    } else {
      setSearchResults([]);
    }
  };
  
 const handleSearch = async (searchTerm) => {
  try {
    const selectedFilters = Object.keys(checkedFilters).filter(key => checkedFilters[key]);
    const type = selectedFilters.join(',');
    const response = await fetch(`http://localhost:8000/search?query=${searchTerm}&type=${type}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la recherche');
    }
    const data = await response.json();
   
    let results = [];

    // Apllication du filtre coché et ajout du type
    if (checkedFilters.album) {
        results = data.albums.map(album => ({ ...album, type: 'albums' }));
      } else if (checkedFilters.artist) {
        results = data.artists.map(artist => ({ ...artist, type: 'artists' }));
      } else if (checkedFilters.genre) {
        results = data.genres.map(genre => ({ ...genre, type: 'genres' }));
      }

    // Afficher les résultats qui commence par le terme écrit
    if (searchTerm) {
      results = results.filter(item => item.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    }

    setSearchResults(results);
  } catch (error) {
    console.error(error);
  }
};
 
  // Fonction pour gérer l'état des checkbox
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
    }));
    handleSearch();
  };

  return (
    <div className='main search-container'>
      <h2>Chercher un album, un artiste ou un genre de musique</h2>
    <input
      type="checkbox"
      name="album"
      checked={checkedFilters.album}
      onChange={handleCheckboxChange}
    />
    <label htmlFor="album">Album</label>
  
    <input
      type="checkbox"
      name="artist"
      checked={checkedFilters.artist}
      onChange={handleCheckboxChange}
    />
    <label htmlFor="artist">Artiste</label>
  
    <input
      type="checkbox"
      name="genre"
      checked={checkedFilters.genre}
      onChange={handleCheckboxChange}
    />
    <label htmlFor="genre">Genre</label>
  
    <input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      maxLength={100}
    />


      {searchResults && searchResults.length > 0 && (
        <ul>
          {searchResults.map(result => (
            <li key={result.id}>
              <Link to={`/${result.type}/${result.id}`}>{result.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
