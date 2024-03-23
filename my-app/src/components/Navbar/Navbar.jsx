import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaSpotify } from "react-icons/fa";
import './Navbar.css';

function Navbar() {

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <FaSpotify className="spotify-icon" />
            </div>
            <ul className="navbar-menu">
                <li className="navbar-item">
                    <Link to="/">Accueil</Link> 
                </li>
                <li className="navbar-item">
                    <Link to="/albums">Albums</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/genres">Genres</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/artists">Artistes</Link>
                </li>
                
            </ul>
        </nav>
    )
}

export default Navbar;