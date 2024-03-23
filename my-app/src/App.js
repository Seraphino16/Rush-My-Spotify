import React from 'react';
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import GenresList from './components/Genres/GenreList/GenresList';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/genres" exact component={GenresList} />
        </Switch>
      </div>
    </div>
  </Router>
    

  );
}

export default App;


