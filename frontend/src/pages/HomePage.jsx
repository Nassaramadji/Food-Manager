import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css'; // Assurez-vous d'avoir ce fichier CSS
import image from './image.jpg'; // Assurez-vous que l'image est dans le bon chemin


function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <body className="homepage">
           <div className='header-container'>
             <div className="header-content">
                <h1 className='menu'>Menu Principal</h1>
                <nav>
                    <ul className="nav-list">
                        <li><Link to="/meals/today">Mes Plats pour aujourd'hui</Link></li>
                        <li><Link to="/meals/week">Mes plats pour la semaine</Link></li>
                        <li><Link to="/meals/month">Mes plats pour le mois</Link></li>
                        <li><Link to="/my-buffet">Liste des plats de mon Buffet</Link></li>
                        <li><Link to="/favorites">Mes plats favoris</Link></li>
                        <li><Link to="/expired">Mes plats expirés</Link></li>
                        <li><Link to="/allergies">Les plats dont je suis allergique</Link></li>
                    </ul>
                </nav>
                {token && <button onClick={handleLogout} className="logout-button">Déconnexion</button>}
            </div>
            <div className='image-container'>
                 <img src={image} alt="L'image d'accueil" className='accueil_image' />
            </div>
           </div>
           <footer>Avec Food Manager. Vivons une Vie Saine</footer>
        </body>
    );
}

export default Header;