//FoodListePage.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import './foodlistpage.css'; // Assurez-vous d'avoir un fichier CSS pour les styles

function FoodListPage() {
  const [plats, setPlats] = useState([]);
  const [message, setMessage] = useState('');

 useEffect(() => {
  const fetchPlats = async () => {
    try {
      const res = await api.get('/plats');
      setPlats(res.data);  // ← CORRECTION ici
    } catch (err) {
      setMessage("Erreur lors du chargement des plats.");
    }
  };
  fetchPlats();
}, []);


const handleAddToBuffet = async (platId) => {
  try {
    const token = localStorage.getItem('token');
    const res = await api.post('/buffet', {
      content_type: 'plat',
      content_id: platId
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setMessage(res.data.message);
  } catch (err) {
    setMessage(err.response?.data?.message || "Erreur lors de l'ajout.");
  }

  setTimeout(() => setMessage(''), 3000);
};


  return (
    <div className="pt-28 px-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">🍱 Les plats disponibles</h1>

      {message && (
        <p className="text-center text-green-800 font-semibold">{message}</p>
      )}

      <div className="corps">
        {plats.map((plat) => (
          <div key={plat.id} className="corps1">
            <img
              src={`http://localhost:5000${plat.image_url}`}
              alt={plat.nom}
              className="w-full h-48 object-cover"
            />
            <div className="corps2">
              <h2 className="nom">{plat.nom}</h2>
              <p className="description">{plat.description}</p>
              <p className='ingredients'>{plat.ingredients}</p>
              <button
                onClick={() => handleAddToBuffet(plat.id)}
                className="ajouter">
                Ajouter au buffet
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center text-gray-500 mt-10">
        Avec <strong>Food Manager</strong>, vivons une vie saine.
      </footer>
    </div>
  );
}

export default FoodListPage;
