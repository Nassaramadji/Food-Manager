import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AddFood from './pages/AddFoood';
import FoodListPage from './pages/FoodListPage';
import Navbar from './components/Navbar';
import MyBuffetPage from './pages/MyBuffetPage';
import './App.css'; // Assure-toi d'avoir un fichier CSS pour les styles globaux
import './index.css'; // Assure-toi d'avoir un fichier CSS pour les styles globaux

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-food" element={<AddFood />} />
        <Route path="/plats" element={<FoodListPage />} />
        <Route path="/my-buffet" element={<MyBuffetPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;


