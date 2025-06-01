import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [search, setSearch] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/foods?search=${encodeURIComponent(search)}`);
            setSearch('');
        }
    };

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <h1>Food Manager</h1>
                </div>
                <div className="links">
                    <Link to="/">Accueil</Link>
                    <Link to="/plats">Les plats disponibles</Link>
                    <Link to="/add-food">Ajouter Plat Perso</Link>
                    <Link to="/support">Support</Link>
                    {token ? (
                        <button onClick={handleLogout}>Déconnexion</button>
                    ) : (
                        <>
                            <Link to="/login">Connexion</Link>
                            <Link to="/register">Inscription</Link>
                        </>
                    )}
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="search-input"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="search-button">🔍</button>
                    </form>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;