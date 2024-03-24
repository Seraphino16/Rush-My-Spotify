import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSpotify } from "react-icons/fa";
import './Navbar.css';

function Navbar() {

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <FaSpotify className="spotify-icon" />
                <span className='navbar-title'>Spotify</span>
            </div>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <NavLink to="/" exact activeClassName="active">Accueil</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/albums">Albums</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/genres" activeClassName="active">Genres</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/artists">Artistes</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/search">Recherche</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;