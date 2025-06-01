import React, { useEffect, useState } from 'react';
import api from '../api';

function MyBuffetPage() {
  const [buffet, setBuffet] = useState([]);

  useEffect(() => {
    const fetchBuffet = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await api.get('/my-buffet', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBuffet(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBuffet();
  }, []);


const handleDelete = async (itemId) => {
  const token = localStorage.getItem('token');
  try {
    await api.delete(`/my-buffet/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Supprime l'élément du state
    setBuffet(prev => prev.filter(item => item.id !== itemId));
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
  }
};


  return (
    <div className="pt-28 px-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">🍽️ Mon buffet</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {buffet.length > 0 ? buffet.map(({ id, name, description, image_url, type }) => (
         <div key={id} className="bg-white rounded-xl shadow overflow-hidden">
         <img src={image_url} alt={name} className="w-full h-48 object-cover" />
         <div className="p-4">
            <h2 className="text-xl font-bold text-green-700">
            {name} <span className="text-sm text-gray-400">({type})</span>
            </h2>
            <p className="text-sm text-gray-600">{description}</p>
         </div>
         <div className="flex items-center justify-between">
           <h2 className="text-xl font-bold text-green-700">{name}</h2>
           <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
           {type === "food" ? "Ajouté par moi" : "Plat existant"}
           </span>
            <button
              onClick={() => handleDelete(id)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded"> Supprimer
            </button>
         </div>
         </div>

        )) : (
          <p className="col-span-full text-center text-gray-500">Aucun plat ajouté pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default MyBuffetPage;
