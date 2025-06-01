import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './registrepage.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', form);
      alert('Inscription réussie !');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || 'Erreur lors de l\'inscription.');
    }
  };

  return (
    <div className="corps">
      <h2 className="text-2xl mb-4">Créer un compte</h2>
      <form onSubmit={handleRegister} className="form">
        <input type="text" placeholder="Nom d'utilisateur" required
               value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className='nom'/> <br /><br />
        <input type="email" placeholder="Email" required
               value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className='email' /> <br /><br />
        <input type="password" placeholder="Mot de passe" required
               value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className='passeword'/> <br /><br />
        <button type="submit" className="bouton">S'inscrire</button>
      </form>
    </div>
  );
}

export default RegisterPage;
