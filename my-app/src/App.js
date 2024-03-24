import React from 'react';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import GenreDetails from './components/Genres/GenreDetails/GenreDetails';
import GenresList from './components/Genres/GenreList/GenresList';
import AlbumList from './components/Album/AlbumList/AlbumList';
import AlbumDetails from './components/Album/AlbumDetails/AlbumDetails';
import ListArtist from './components/Artists/ArtistList/ArtistList';
import ArtistDetails from './components/Artists/ArtistDetails/ArtistDetails';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/genres" exact component={GenresList} />
          <Route path="/genres/:genreId" exact component={GenreDetails} />
          <Route path="/albums" exact component={AlbumList} />
          <Route path="/albums/:id" exact component={AlbumDetails} /> 
          <Route path="/artists" exact component={ListArtist}></Route>
          <Route path="/artists/:id" exact component={ArtistDetails}></Route>
        </Switch>
      </div>
    </div>
  </Router>
    

  );
}

export default App;


