
// ✅ src/pages/AddFood.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './addfood.css'


function AddFood() {
  const [form, setForm] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/foods', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/dashboard');
    } catch (err) {
      alert("Erreur lors de l'ajout");
    }
  };

  return (
  
     <main>
      <div>
      <h2 className="text-2xl mb-4">Ajouter un plat</h2>
      <form onSubmit={handleAddFood}>
        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nom du plat" required className='NomPlat' /> <br /><br />
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className='descriptions' /> <br /><br />
        <button type="submit" className='ajout'>Ajouter</button>
      </form>
    </div>
     </main>
  
  );
}

export default AddFood;
