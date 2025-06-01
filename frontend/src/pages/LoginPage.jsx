// ✅ src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './loginpage.css'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      alert('Connexion échouée. Vérifie tes identifiants.');
    }
  };

  return (
    <div className="corps">
      <h2 className="connexion">Connexion</h2>
      <form onSubmit={handleLogin} >
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className='email' /> <br /> <br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" required className='passeword' /> <br /> <br />
        <p className='oublie'>Mot de passe oublié ?</p>
        <br />
        <button type="submit" className='connecter'>Se connecter</button>
      </form>
    </div>
  );
}

export default LoginPage;

